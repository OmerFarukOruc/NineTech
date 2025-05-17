
"use server";

import { z } from "zod";
import nodemailer from "nodemailer";
import { contactFormSchema } from "@/lib/schemas";

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

  // Check for required environment variables
  const requiredEnvVars = [
    "SMTP_HOST",
    "SMTP_PORT",
    "SMTP_USER",
    "SMTP_PASS",
    "EMAIL_TO",
    "EMAIL_FROM",
  ];
  const missingEnvVars = requiredEnvVars.filter(
    (varName) => !process.env[varName]
  );

  if (missingEnvVars.length > 0) {
    console.error(
      "Missing required SMTP environment variables:",
      missingEnvVars.join(", ")
    );
    return {
      message:
        "Server configuration error: Could not send email. Please contact support.",
      success: false,
    };
  }

  const smtpHost = process.env.SMTP_HOST!;
  const smtpPort = process.env.SMTP_PORT!;
  const smtpUser = process.env.SMTP_USER!;
  const smtpPass = process.env.SMTP_PASS!;
  const emailTo = process.env.EMAIL_TO!;
  const emailFrom = process.env.EMAIL_FROM!;

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort, 10),
      secure: parseInt(smtpPort, 10) === 465, // true for 465 (SSL), false for 587 (TLS/STARTTLS) and others
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      // Consider adding tls options if needed for your cPanel server, e.g., for self-signed certs (use with caution)
      // tls: {
      //   rejectUnauthorized: process.env.NODE_ENV === 'production' // false in dev if needed
      // }
    });

    const mailOptions = {
      from: `"${parsed.data.name}" <${emailFrom}>`, // Display name is user's, actual sender is your server email
      replyTo: parsed.data.email, // So you can reply directly to the user
      to: emailTo, // Your email address to receive quote requests
      subject: `New Quote Request from ${parsed.data.name} via Ninetech Portfolio`,
      text: `You have received a new quote request:
Name: ${parsed.data.name}
Email: ${parsed.data.email}
Message:
${parsed.data.message}`,
      html: `<h3>New Quote Request</h3>
             <p><strong>Name:</strong> ${parsed.data.name}</p>
             <p><strong>Email:</strong> <a href="mailto:${parsed.data.email}">${parsed.data.email}</a></p>
             <p><strong>Message:</strong></p>
             <p>${parsed.data.message.replace(/\n/g, "<br>")}</p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log(
      `Quote request email successfully sent from ${parsed.data.email} (via ${emailFrom}) to ${emailTo}. Subject: ${mailOptions.subject}`
    );

    return {
      message:
        "Thank you for your quote request! I will get back to you soon.",
      success: true,
    };
  } catch (error) {
    console.error("Failed to send email:", error);
    let errorMessage =
      "An error occurred while sending your message. Please try again later.";
    if (error instanceof Error) {
        // More specific error messages can be logged or handled here if needed
        // For example, check for authentication errors, connection issues, etc.
        // For security, don't expose detailed SMTP errors to the client.
    }
    return {
      message: errorMessage,
      success: false,
      fields: parsed.data, // Preserve form data on error
    };
  }
}
