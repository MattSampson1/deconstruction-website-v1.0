import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet'; // Using shadcn Sheet
import { Menu } from 'lucide-react'; // Icons

// Define navigation items type (reuse or define here)
interface NavItem {
  href: string;
  label: string;
}

interface MobileNavProps {
  navItems: NavItem[];
  siteTitle?: string; // Optional site title for header
}

export default function MobileNav({ navItems, siteTitle = "Menu" }: MobileNavProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden" // Only show on mobile
          aria-label="Open main menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:w-[300px] p-0"> {/* Adjust width as needed */}
        <SheetHeader className="border-b p-4">
          <SheetTitle className="text-lg font-semibold">
            {/* Optionally show site title or just "Menu" */}
            {siteTitle || "Navigation"}
          </SheetTitle>
          {/* SheetClose is implicitly handled by shadcn, but good for accessibility if needed */}
           {/* <SheetClose asChild>
               <Button variant="ghost" size="icon" className="absolute top-3 right-3">
                   <X className="h-5 w-5" />
                   <span className="sr-only">Close menu</span>
               </Button>
           </SheetClose> */}
        </SheetHeader>
        <div className="flex flex-col space-y-2 p-4">
          {navItems.map((item) => (
             // Use SheetClose to automatically close on link click
            <SheetClose asChild key={item.href}>
              <Link
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground/80 hover:bg-accent hover:text-accent-foreground"
              >
                {item.label}
              </Link>
            </SheetClose>
          ))}
          <div className="pt-4 mt-4 border-t">
             {/* Include the primary CTA button */}
             <SheetClose asChild>
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Link href="/contact">Get Estimate</Link>
                </Button>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}