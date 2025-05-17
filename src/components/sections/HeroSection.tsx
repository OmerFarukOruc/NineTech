
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';
import { SectionContainer } from '@/components/layout/SectionContainer';

export function HeroSection() {
  return (
    <SectionContainer id="hero" className="bg-secondary pt-32 md:pt-40 lg:pt-48 text-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight">
        Innovative Tech Solutions
        <br className="hidden md:block" /> for Complex Challenges
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
        Specializing in embedded systems, IoT, and full-stack development to bring your ideas to life.
      </p>
      <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 sm:justify-center">
        <Button 
          asChild 
          size="lg" 
          className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-lg rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 w-full sm:w-auto"
        >
          <Link href="#contact">
            Get a Quote
            <MoveRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
        <Button 
          asChild 
          variant="outline" 
          size="lg" 
          className="px-8 py-3 text-lg rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 w-full sm:w-auto"
        >
          <Link href="/portfolio">View My Work</Link>
        </Button>
      </div>
    </SectionContainer>
  );
}
