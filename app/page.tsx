import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image'; // Uncomment this import
// import Image from 'next/image'; // Import Next.js Image

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-20 md:py-32">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-background.jpg"
            alt="Modern home construction project"
            fill
            quality={85}
            sizes="100vw"
            priority
            className="object-cover opacity-30"
          />
        </div>

        {/* Content Container */}
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Building Tomorrow&apos;s Spaces, Today.
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Diamond Edge Construction leverages modern techniques and meticulous planning
            to deliver exceptional remodeling and construction services.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/contact">Get a Free Estimate</Link>
            </Button>
            <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/portfolio">View Our Work</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Placeholder for upcoming sections */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-4">Services Overview</h2>
          <p className="text-muted-foreground">
            [Service cards will go here - linking to /services]
          </p>
        </div>
      </section>

      <section className="bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-4">Why Choose Us?</h2>
          <p className="text-muted-foreground">
            [Value proposition points will go here]
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-4">Recent Projects</h2>
          <p className="text-muted-foreground">
            [Portfolio sneak peek cards will go here - linking to /portfolio]
          </p>
        </div>
      </section>

       {/* Add more sections as needed */}

    </>
  );
}