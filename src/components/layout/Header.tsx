
"use client";
import { Logo } from './Logo';
import { NavMenu } from './NavMenu';
import type { NavItem } from '@/lib/types';
import { useEffect, useState } from 'react';

const navItems: NavItem[] = [
  { href: '/#services', label: 'Services' }, // Ensure this links correctly if on a different page
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About Us' },
  { href: '/#contact', label: 'Contact' }, // Ensure this links correctly if on a different page
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(window.location.pathname); // Set current path on mount

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Adjust anchor links based on current page
  const adjustedNavItems = navItems.map(item => {
    if (item.href.startsWith('/#') && currentPath !== '/') {
      // If on a subpage and link is an anchor for homepage, prepend /
      return { ...item, href: `/${item.href.substring(1)}` };
    }
    if (item.href.startsWith('#') && currentPath !== '/') {
         return { ...item, href: `/${item.href}` };
    }
    return item;
  });

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Logo />
        <NavMenu navItems={adjustedNavItems} />
      </div>
    </header>
  );
}
