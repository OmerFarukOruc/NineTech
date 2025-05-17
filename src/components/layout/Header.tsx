"use client";
import { Logo } from './Logo';
import { NavMenu } from './NavMenu';
import type { NavItem } from '@/lib/types';
import { useEffect, useState } from 'react';

const navItems: NavItem[] = [
  { href: '#services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' }, // Updated href
  { href: '#contact', label: 'Contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Logo />
        <NavMenu navItems={navItems} />
      </div>
    </header>
  );
}
