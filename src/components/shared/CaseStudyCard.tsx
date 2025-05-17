
import type { CaseStudy } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Link href={`/portfolio/${caseStudy.id}`} passHref legacyBehavior>
        <a className="block hover:cursor-pointer" aria-label={`View details for ${caseStudy.title}`}>
          <div className="relative w-full h-48 sm:h-56 md:h-64">
            <Image
              src={caseStudy.imageUrl}
              alt={`Preview image for case study: ${caseStudy.title}`}
              fill={true}
              style={{ objectFit: 'cover' }}
              data-ai-hint={caseStudy.imageHint}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <CardHeader className="pb-4">
            <CardTitle className="text-xl hover:underline">{caseStudy.title}</CardTitle>
            <CardDescription className="text-sm min-h-[3rem]">{caseStudy.description}</CardDescription>
          </CardHeader>
        </a>
      </Link>
      {/* CardContent can be used if there's content not part of the main link area */}
      <CardContent className="flex-grow pt-0"> 
        {/* Intentionally empty for now, or could hold tags not part of the main link */}
      </CardContent>
      <CardFooter className="flex justify-start space-x-2 pt-4 mt-auto">
        {caseStudy.projectUrl && caseStudy.projectUrl !== '#' && (
          <Button asChild variant="outline" size="sm">
            <Link href={caseStudy.projectUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" /> View Project
            </Link>
          </Button>
        )}
        {caseStudy.githubUrl && caseStudy.githubUrl !== '#' && (
          <Button asChild variant="ghost" size="sm">
            <Link href={caseStudy.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" aria-hidden="true" /> View on GitHub
            </Link>
          </Button>
        )}
        {/* Fallback if no external links but we still want a button to the detail page, though the top part is already a link */}
        {(!caseStudy.projectUrl || caseStudy.projectUrl === '#') && (!caseStudy.githubUrl || caseStudy.githubUrl === '#') && (
           <Button asChild variant="default" size="sm">
            <Link href={`/portfolio/${caseStudy.id}`}>
              View Details
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
