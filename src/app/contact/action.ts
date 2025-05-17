
"use server";

import { z } from "zod";
import { contactFormSchema } from "@/lib/schemas";
import type { ReactNode } from "react";
import { startTransition } from "react";


export type ContactFormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  success: boolean;
};

export async function submitContactForm(
  prevState: ContactFormState,
  data: FormData
): Promise<ContactFormState> {
  const formData = Object.fromEntries(data);
  const parsed = contactFormSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      message: "Invalid form data.",
      fields: formData as Record<string, string>,
      issues: parsed.error.issues.map((issue) => issue.message),
      success: false,
    };
  }

  // Check for required EmailJS environment variables
  const emailJsServiceId = process.env.EMAILJS_SERVICE_ID;
  const emailJsTemplateId = process.env.EMAILJS_TEMPLATE_ID;
  const emailJsPublicKey = process.env.EMAILJS_PUBLIC_KEY; // User ID is often referred to as Public Key

  if (!emailJsServiceId || !emailJsTemplateId || !emailJsPublicKey) {
    console.error(
      "Missing required EmailJS environment variables (SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY)."
    );
    return {
      message:
        "Server configuration error: Could not send email. Please contact support.",
      success: false,
    };
  }

  const emailJsParams = {
    service_id: emailJsServiceId,
    template_id: emailJsTemplateId,
    user_id: emailJsPublicKey,
    template_params: {
      name: parsed.data.name,
      email: parsed.data.email,
      message: parsed.data.message,
      // Add any other params your EmailJS template expects
    },
    // If you have an Access Token (Private Key) for backend use, add it here:
    // accessToken: process.env.EMAILJS_ACCESS_TOKEN 
  };

  try {
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailJsParams),
    });

    if (response.ok) {
      const responseText = await response.text(); // EmailJS often returns "OK" as text
      console.log(
        `Quote request email successfully sent via EmailJS from ${parsed.data.email}. EmailJS Response: ${responseText}`
      );
      return {
        message:
          "Thank you for your quote request! I will get back to you soon.",
        success: true,
      };
    } else {
      const errorText = await response.text();
      console.error("Failed to send email via EmailJS:", response.status, errorText);
      return {
        message: `An error occurred while sending your message (EmailJS Error: ${response.status} - ${errorText}). Please try again later.`,
        success: false,
        fields: parsed.data, // Preserve form data on error
      };
    }
  } catch (error) {
    console.error("Failed to send email via EmailJS (Network/Fetch Error):", error);
    let errorMessage =
      "An error occurred while sending your message. Please try again later.";
    if (error instanceof Error) {
      // More specific error messages can be logged or handled here if needed
    }
    return {
      message: errorMessage,
      success: false,
      fields: parsed.data, // Preserve form data on error
    };
  }
}
