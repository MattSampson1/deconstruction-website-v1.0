import projectsData from '@/data/projects.json';

// Define the Project type (can be shared or imported if defined elsewhere)
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

// Function to get all projects (useful for generating static paths if needed later)
export function getAllProjects(): Project[] {
  return projectsData as Project[];
}

// Function to get a single project by its ID
export function getProjectById(id: string): Project | undefined {
  const projects = getAllProjects();
  return projects.find((project) => project.id === id);
}