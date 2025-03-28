import React from 'react';
import PortfolioCard from '@/components/cards/portfolio-card';
import projectsData from '@/data/projects.json'; // Import project data
import type { Metadata } from 'next';

// Define Metadata for the Portfolio page
export const metadata: Metadata = {
  title: 'Project Portfolio - Diamond Edge Construction Inc.',
  description: 'Browse our portfolio of completed construction and remodeling projects, showcasing our quality workmanship and diverse capabilities.',
};

// Define the type for a single project based on the JSON structure
interface Project {
  id: string;
  title: string;
  description: string;
  date: string;
  images: string[];
  altTexts: string[];
  category: string;
  tags?: string[];
}

export default function PortfolioPage() {
  const projects: Project[] = projectsData; // Assign data to typed variable

  return (
    <main className="bg-background">
      {/* Page Header Section */}
      <section className="py-16 md:py-24 bg-secondary border-b">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Our Work
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We take pride in delivering exceptional results. Explore a selection of our
            past projects to see the quality and attention to detail we bring to every job.
          </p>
        </div>
      </section>

      {/* Portfolio Grid Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <PortfolioCard
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  date={project.date}
                  images={project.images}
                  altTexts={project.altTexts}
                  category={project.category}
                  tags={project.tags}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              Our portfolio is currently being updated. Please check back soon!
            </p>
          )}
        </div>
      </section>
    </main>
  );
}