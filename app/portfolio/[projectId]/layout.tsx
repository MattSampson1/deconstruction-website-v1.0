import { getProjectById } from '@/lib/data';
import type { Metadata, ResolvingMetadata } from 'next';

// Define props type matching the dynamic segment
type Props = {
  params: { projectId: string };
};

// --- Dynamic Metadata Generation (Moved Here) ---
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const projectId = params.projectId;
  const project = getProjectById(projectId);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  // Construct absolute image URL for Open Graph
  // Ensure NEXT_PUBLIC_SITE_URL is set in your .env.local and .env.example
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'; // Fallback needed
  const ogImageUrl = project.images?.[0] ? `${siteUrl}${project.images[0]}` : undefined;

  const ogImages = ogImageUrl ? [{
      url: ogImageUrl,
      width: 1200, // Common OG width
      height: 630, // Common OG height
    }] : [];

  return {
    title: `${project.title} - Portfolio | Diamond Edge Construction Inc.`,
    description: project.description.substring(0, 160),
    openGraph: {
      title: project.title,
      description: project.description.substring(0, 160),
      images: ogImages,
      type: 'article',
      publishedTime: project.date,
      tags: project.tags,
      url: `${siteUrl}/portfolio/${projectId}`, // Add canonical URL
    },
  };
}

// --- Layout Component ---
// This simple layout just passes children through.
// It exists primarily to host the generateMetadata function.
export default function ProjectDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>; // Render the page component passed as children
}