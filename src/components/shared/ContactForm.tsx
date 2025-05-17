// @ts-nocheck
"use client";

import { useActionState, useEffect } from "react"; // Changed from "react-dom" to "react" and "useFormState" to "useActionState"
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ContactFormState, submitContactForm } from "@/app/contact/action";
import { contactFormSchema } from "@/lib/schemas";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Send } from "lucide-react";

const initialState: ContactFormState = {
  message: "",
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
      {pending ? "Sending..." : <>Send Message <Send className="ml-2 h-4 w-4" /></>}
    </Button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState); // Changed useFormState to useActionState
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: state.fields?.name || "",
      email: state.fields?.email || "",
      message: state.fields?.message || "",
    }
  });

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: "Success!",
          description: state.message,
        });
        reset(); // Reset form fields on success
      } else {
        // Concatenate all issues for the description
        const description = state.issues && state.issues.length > 0 
          ? state.issues.join(" ") 
          : state.message;
        toast({
          title: "Error",
          description: description,
          variant: "destructive",
        });
      }
    }
  }, [state, toast, reset]);
  
  // This function will be passed to handleSubmit
  // It ensures that formAction is called with FormData
  const onSubmit = (data: { name: string; email: string; message: string; }) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    // @ts-ignore // TODO: Fix this type error
    formAction(formData); 
  };
  
  return (
    // Pass the onSubmit wrapper to handleSubmit
    // The native `action` prop on the form is still needed for progressive enhancement
    // and for the useFormStatus hook to work correctly.
    <form 
      action={formAction} // Keep native action for progressive enhancement and useFormStatus
      onSubmit={handleSubmit(onSubmit)} // Use react-hook-form's handleSubmit to trigger validation
      className="space-y-6 max-w-xl mx-auto bg-card p-6 sm:p-8 rounded-lg shadow-xl"
    >
      <div className="flex items-center justify-center mb-6">
        <Mail className="h-8 w-8 text-primary mr-3" />
        <h3 className="text-2xl font-semibold text-center">Send a Message</h3>
      </div>
      <div>
        <Label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">Full Name</Label>
        <Input
          id="name"
          type="text"
          {...register("name")}
          className="bg-background border-input"
          aria-invalid={errors.name ? "true" : "false"}
        />
        {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">Email Address</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          className="bg-background border-input"
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>}
      </div>

      <div>
        <Label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">Message</Label>
        <Textarea
          id="message"
          rows={5}
          {...register("message")}
          className="bg-background border-input min-h-[120px]"
          aria-invalid={errors.message ? "true" : "false"}
        />
        {errors.message && <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>}
      </div>
      
      <SubmitButton />
    </form>
  );
}
