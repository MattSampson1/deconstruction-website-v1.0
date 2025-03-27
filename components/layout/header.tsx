import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // Using shadcn Button

export default function Header() {
  // Basic navigation links - will enhance later
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center mx-auto px-4">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            {/* Add Logo SVG or Text Here */}
            <span className="font-bold sm:inline-block">
              Diamond Edge Construction Inc. {/* Replace with your actual business name */}
            </span>
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
        {/* Mobile Menu Button Placeholder - Will implement later */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="md:hidden">
            {/* Mobile Menu Trigger */}
            <Button variant="ghost" size="sm">
              Menu
            </Button>
          </div>
          <nav className="hidden md:flex items-center">
            <Button asChild>
              <Link href="/contact">Get Estimate</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
