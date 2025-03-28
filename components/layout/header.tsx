import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import MobileNav from './mobile-nav';
import Image from 'next/image';

// Define navigation items (can be moved to a constants file later)
const navItems = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const siteName = "Diamond Edge Construction Inc.";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center mx-auto px-4">
        {/* Desktop Logo and Nav */}
        <div className="mr-4 hidden md:flex items-center"> {/* Keep mr-4 for spacing */}
          <Link href="/" className="mr-6 flex items-center space-x-2">
          <Image
            src="/logo.svg" 
            alt="Diamond Edge Construction Inc. Logo" 
            width={50} 
            height={50} 
            className="h-8 w-auto sm:h-10" 
            priority 
          />
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Nav Trigger & Desktop CTA */}
        <div className="flex flex-1 items-center justify-end space-x-2">
          {/* Desktop CTA Button */}
          <nav className="hidden md:flex items-center">
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/contact">Get Estimate</Link>
            </Button>
          </nav>

          {/* Mobile Menu Component (Includes Trigger) */}
          <div className="md:hidden"> {/* Ensure MobileNav trigger is only shown on mobile */}
             <MobileNav navItems={navItems} siteTitle={siteName} />
          </div>
        </div>
      </div>
    </header>
  );
}