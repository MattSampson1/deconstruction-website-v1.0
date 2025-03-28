// Make this a Client Component to use hooks
'use client';

import { useState } from 'react';
import { useParams, notFound } from 'next/navigation'; // Import useParams and keep notFound
import { getProjectById } from '@/lib/data';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

// Import Lightbox component and styles
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

// Metadata is handled by app/portfolio/[projectId]/layout.tsx

// --- Page Component ---
// Remove params from the function signature
export default function ProjectDetailPage() {
  // Use the useParams hook to get route parameters
  const params = useParams<{ projectId: string }>(); // Specify the expected shape
  const projectId = params.projectId; // Extract projectId

  const [project, setProject] = useState(() => getProjectById(projectId)); // Initialize state with fetched project
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Re-evaluate project if projectId changes (though unlikely in this structure)
  // This might be overkill if the component always remounts on route change
  // useEffect(() => {
  //   setProject(getProjectById(params.projectId));
  // }, [params.projectId]);


  // Handle project not found (client-side check)
  // Note: Ideally, the layout's metadata function would handle the primary 404 signal
  if (!project) {
     // Trigger the notFound() UI from the client.
     // This might show your app shell briefly before the not-found UI appears.
     // For a cleaner 404, ensure server-side data fetching (e.g., in the parent Layout/Page if it were a Server Component) handles it first.
     notFound();
     // Or return a loading/error state initially if preferred
     // return <div>Loading or Project Not Found...</div>;
  }

  // Format date
  const formattedDate = new Date(project.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Prepare slides for the lightbox
  const slides = project.images.map((imgSrc, index) => ({
    src: imgSrc,
    alt: project.altTexts?.[index] || `Image ${index + 1} for ${project.title}`,
  }));

  // Function to open lightbox
  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  return (
    // --- JSX remains largely the same as before ---
    <main className="bg-background">
      {/* Project Header Section */}
      <section className="py-16 md:py-24 bg-secondary border-b">
        <div className="container mx-auto px-4">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
            {project.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-2 mb-3">
            {project.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            Completed: {formattedDate}
          </p>
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Project Details & Images Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Project Description */}
          <article className="prose prose-lg dark:prose-invert max-w-none lg:max-w-4xl mx-auto mb-12">
            <p>{project.description}</p>
          </article>

          <Separator className="my-12" />

          {/* Image Grid */}
          <h2 className="text-3xl font-semibold tracking-tight mb-8 text-center">Gallery</h2>
          {project.images && project.images.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {project.images.map((imgSrc, index) => (
                <button
                  key={index}
                  onClick={() => openLightbox(index)}
                  className="relative aspect-video overflow-hidden rounded-lg shadow-md group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label={`View image ${index + 1} for ${project.title}`}
                >
                  <Image
                    src={imgSrc}
                    alt={project.altTexts?.[index] || `Thumbnail ${index + 1} for ${project.title}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="transition-transform duration-300 group-hover:scale-105 bg-muted"
                  />
                   {/* Labels */}
                   {imgSrc.toLowerCase().includes('before') && (<Badge variant="destructive" className="absolute top-2 left-2 z-10">Before</Badge>)}
                   {imgSrc.toLowerCase().includes('after') && !imgSrc.toLowerCase().includes('before') && (<Badge variant="default" className="absolute top-2 right-2 z-10">After</Badge>)}
                   {project.altTexts?.[index] && !project.altTexts[index].toLowerCase().includes('before') && !project.altTexts[index].toLowerCase().includes('after') && (
                     <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                       <p className="text-white text-sm truncate">{project.altTexts[index]}</p>
                     </div>
                   )}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No images available for this project.</p>
          )}

          {/* Back to Portfolio Link */}
           <div className="mt-16 text-center">
              <Badge variant="secondary" asChild>
                 <Link href="/portfolio" className="hover:underline">
                     ← Back to Portfolio
                 </Link>
             </Badge>
           </div>
        </div>
      </section>

      {/* Lightbox Component */}
      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        slides={slides}
        index={currentIndex}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, .8)" } }}
      />
    </main>
  );
}