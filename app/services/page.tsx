import React from 'react';
import ServiceCard from '@/components/cards/service-card';
import servicesData from '@/data/services.json'; // Import the JSON data directly
import type { Metadata } from 'next';

// Define Metadata for the Services page
export const metadata: Metadata = {
  title: 'Our Services - Diamond Edge Construction Inc.',
  description: 'Explore the range of construction and remodeling services offered by Diamond Edge Construction, including kitchen and bathroom remodels.',
};

// Define the type for a single service based on the JSON structure
// It's good practice to type your data
interface Service {
  id: string;
  title: string;
  summary: string;
  description: string; // Full description is available if needed later
  icon?: string;
  image: string;
  altText: string;
}

export default function ServicesPage() {
  const services: Service[] = servicesData; // Assign data to typed variable

  return (
    <main className="bg-background">
      {/* Page Header Section */}
      <section className="py-16 md:py-24 bg-secondary border-b">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Our Construction Services
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            From concept to completion, Diamond Edge Construction provides expert craftsmanship
            and tech-driven solutions for your remodeling and construction needs.
          </p>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  id={service.id}
                  title={service.title}
                  summary={service.summary}
                  image={service.image}
                  altText={service.altText}
                  // Pass icon if you plan to use it: icon={service.icon}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              No services available at this time. Please check back later.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}