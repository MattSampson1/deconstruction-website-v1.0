import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
// import Link from 'next/link'; // Import Link for future linking **TO FIX PRODUCTION**

// Define the props based on the structure in services.json
interface ServiceCardProps {
  id: string;
  title: string;
  summary: string;
  image: string;
  altText: string;
  icon?: string; // Optional icon name/path
}

export default function ServiceCard({
  // id, // **TO FIX PRODUCTION**
  title,
  summary,
  image,
  altText,
}: ServiceCardProps) {
  // Potential future link to a dedicated service page: const serviceLink = `/services/${id}`;

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
      {/* Consider linking the whole card or just parts later */}
      {/* <Link href={serviceLink} className="flex flex-col h-full"> */}
        <div className="relative w-full h-48"> {/* Fixed height container for image */}
          <Image
            src={image}
            alt={altText}
            fill // Use fill to cover the container
            style={{ objectFit: 'cover' }} // Ensure image covers the area
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Define responsive image sizes
            className="bg-muted" // Add a background color for loading state
          />
        </div>
        <CardHeader>
          {/* Optional: Icon could go here */}
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow"> {/* Use flex-grow to push content down if needed */}
          <CardDescription>{summary}</CardDescription>
        </CardContent>
        {/* Optional Footer for a 'Learn More' button/link */}
        {/* <CardFooter>
          <Button variant="link" asChild className="p-0">
            <Link href={serviceLink}>Learn More</Link>
          </Button>
        </CardFooter> */}
      {/* </Link> */}
    </Card>
  );
}