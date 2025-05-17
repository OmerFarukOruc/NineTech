
"use client";

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { NavItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggleButton } from '@/components/shared/ThemeToggleButton'; // Import ThemeToggleButton

interface NavMenuProps {
  navItems: NavItem[];
}

export function NavMenu({ navItems }: NavMenuProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // For Sheet, it's often better to return a basic trigger or null to avoid hydration mismatch
    // if its open state depends on client-side logic not available at SSR.
    // However, since ThemeToggleButton also has its own mounted check, this might be okay.
    return (
      <div className="md:hidden">
        <Button variant="ghost" size="icon" disabled>
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </div>
    );
  }

  const handleLinkClick = () => {
    setIsSheetOpen(false);
  };

  return (
    <>
      {/* Desktop Menu */}
      <nav className="hidden md:flex space-x-2 items-center"> {/* Adjusted space-x for closer items */}
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-sm font-medium text-foreground hover:text-primary transition-colors px-2 py-1" // Added some padding
          >
            {item.label}
          </Link>
        ))}
        <Button asChild variant="default" size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground ml-2">
          <Link href="#contact">Get a Quote</Link>
        </Button>
        <ThemeToggleButton /> {/* Added ThemeToggleButton for desktop */}
      </nav>

      {/* Mobile Menu */}
      <div className="md:hidden flex items-center space-x-2">
        <ThemeToggleButton /> {/* Added ThemeToggleButton for mobile next to menu trigger */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs bg-background">
            <div className="flex flex-col space-y-6 p-6">
              <div className="flex justify-between items-center mb-4">
                 <Link href="/" onClick={handleLinkClick} className="text-xl font-bold text-primary">Ninetech</Link>
                <Button variant="ghost" size="icon" onClick={() => setIsSheetOpen(false)}>
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleLinkClick}
                  className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild variant="default" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground mt-4" onClick={handleLinkClick}>
                <Link href="#contact">Get a Quote</Link>
              </Button>
              {/* Theme toggle can be placed here as well if preferred inside the sheet */}
              {/* <div className="pt-4 mt-4 border-t border-border flex justify-center">
                 <ThemeToggleButton />
              </div> */}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
