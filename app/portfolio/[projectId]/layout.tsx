import { getProjectById } from '@/lib/data';
import type { Metadata } from 'next';
import React from 'react';

type MetadataProps = {
  params: Promise<{ projectId: string }>;
};

export async function generateMetadata(
  { params }: MetadataProps
): Promise<Metadata> {
  const { projectId } = await params;
  const project = getProjectById(projectId);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const ogImageUrl = project.images?.[0] ? `${siteUrl}${project.images[0]}` : undefined;
  const ogImages = ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630 }] : [];

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
      url: `${siteUrl}/portfolio/${projectId}`,
    },
  };
}


export default async function ProjectDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}