import { SectionContainer } from '@/components/layout/SectionContainer';
import { ContactForm } from '@/components/shared/ContactForm';

export function ContactSection() {
  return (
    <SectionContainer id="contact">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Get In Touch</h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Have a project in mind or just want to say hi? Feel free to reach out.
        </p>
      </div>
      <ContactForm />
    </SectionContainer>
  );
}
