
import { Github, Linkedin, Twitter, Mail } from 'lucide-react'; // Added Mail icon
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center space-x-4 mb-4">
          <Link href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-secondary-foreground hover:text-primary transition-colors">
            <Github size={24} />
          </Link>
          <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-secondary-foreground hover:text-primary transition-colors">
            <Linkedin size={24} />
          </Link>
          <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-secondary-foreground hover:text-primary transition-colors">
            <Twitter size={24} />
          </Link>
          <a href="mailto:info@ninetech.com.tr" aria-label="Email us at info@ninetech.com.tr" className="text-secondary-foreground hover:text-primary transition-colors">
            <Mail size={24} />
          </a>
        </div>
        <p className="text-sm mb-2">
          <a href="mailto:info@ninetech.com.tr" className="hover:text-primary hover:underline">info@ninetech.com.tr</a>
        </p>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Ninetech.com.tr. All rights reserved.
        </p>
        <p className="text-xs mt-1">
          Built with Next.js and Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
