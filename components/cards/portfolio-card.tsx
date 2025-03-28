'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

interface PortfolioCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  images: string[];
  altTexts: string[];
  category: string;
  tags?: string[];
}

export default function PortfolioCard({
  id,
  title,
  description,
  date,
  images,
  altTexts,
  category,
  tags,
}: PortfolioCardProps) {
  // --- State and Image Logic (Keep as before) ---
  const primaryImageIndex = images.findIndex(img => !img.toLowerCase().includes('before'));
  const beforeImageIndex = images.findIndex(img => img.toLowerCase().includes('before'));
  const primaryImage = images[primaryImageIndex >= 0 ? primaryImageIndex : 0] || '/images/placeholder-project.jpg';
  const primaryAltText = altTexts[primaryImageIndex >= 0 ? primaryImageIndex : 0] || `After image for project ${title}`;
  const beforeImage = beforeImageIndex >= 0 ? images[beforeImageIndex] : null;
  const beforeAltText = beforeImageIndex >= 0 ? altTexts[beforeImageIndex] : null;

  const [currentImage, setCurrentImage] = useState(primaryImage);
  const [currentAlt, setCurrentAlt] = useState(primaryAltText);
  const [showBeforeLabel, setShowBeforeLabel] = useState(false);
  const formattedDate = new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  const projectLink = `/portfolio/${id}`;

  // --- Hover Handlers (Keep as before) ---
   const handleMouseEnter = () => {
    if (beforeImage) {
      setCurrentImage(beforeImage);
      setCurrentAlt(beforeAltText || `Before image for project ${title}`);
      setShowBeforeLabel(true);
    }
  };
  const handleMouseLeave = () => {
    setCurrentImage(primaryImage);
    setCurrentAlt(primaryAltText);
    setShowBeforeLabel(false);
  };
  // --- End Hover Handlers ---


  return (
    // Link still wraps the entire interactive area
    <Link href={projectLink} className="block group">
      {/* Card remains the main visual container */}
      <Card
         // Remove direct hover listeners from Card if they were causing issues
        className="flex flex-col h-full overflow-hidden transition-shadow duration-300 ease-in-out group-hover:shadow-lg"
      >
        {/* Apply hover listeners to the image container specifically */}
        <div
          className="relative w-full h-56 sm:h-64"
          onMouseEnter={handleMouseEnter} // <<< Attach listener here
          onMouseLeave={handleMouseLeave} // <<< Attach listener here
        >
          {/* "Before" Label */}
          {showBeforeLabel && beforeImage && (
             <div className="absolute top-2 left-2 z-10 bg-black/50 text-white text-xs font-semibold px-2 py-1 rounded">
               BEFORE
             </div>
          )}
          {/* Image Component */}
          <Image
            key={currentImage} // Key helps React differentiate when src changes
            src={currentImage}
            alt={currentAlt}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="bg-muted transition-opacity duration-300"
          />
        </div> {/* End Image Container */}

        {/* Card Header, Content, Footer remain inside Card */}
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{formattedDate}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow space-y-2">
          <p className="text-sm text-muted-foreground line-clamp-3">
             {description}
          </p>
          {category && <Badge variant="secondary">{category}</Badge>}
        </CardContent>
        {tags && tags.length > 0 && (
          <CardFooter className="flex flex-wrap gap-1 pt-2 pb-4">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </CardFooter>
        )}
      </Card> {/* End Card */}
    </Link> // End Link
  );
}