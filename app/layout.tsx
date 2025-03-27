import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

// Setup the Inter font with the variable approach for Tailwind
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

// Define metadata for the site (SEO)
export const metadata: Metadata = {
  title: 'Diamond Edge Construction Inc. - Modern Construction Contracting',
  description:
    'Tech-forward construction services for remodels, renovations, and new builds.',
  icons: {
    icon: '/favicon.ico',
  },
  // Add more metadata later: openGraph, icons, etc.
};

// Root layout component applying global styles, header, and footer
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The lang attribute is important for accessibility and SEO.
    // suppressHydrationWarning can stay; it might help with browser extension issues.
    <html lang="en" suppressHydrationWarning>
      {/*
        The <head> tag is automatically managed by Next.js.
        Metadata defined above and in child pages will be injected here.
        NO content, comments, or whitespace should be placed directly inside <html> before <body>.
      */}
      <body
        className={cn(
          'bg-background min-h-screen font-sans antialiased',
          inter.variable // Apply the font variable class to the body
        )}
      >
        {/*
          Using a flex container ensures the footer sticks to the bottom
          even on pages with little content (thanks to flex-1 on main).
        */}
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            {children} {/* Page content gets rendered here */}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
