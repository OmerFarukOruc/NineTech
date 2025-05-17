
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { caseStudies, type CaseStudy } from '@/lib/data';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';

interface CaseStudyPageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const caseStudy = caseStudies.find(cs => cs.id === params.id);

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found',
      description: 'The case study you are looking for does not exist.',
    };
  }

  const pageTitle = `${caseStudy.title} - Case Study | Ninetech Solutions`; // Updated for consistency
  const pageDescription = caseStudy.description; 

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'; // Ensure metadataBase is defined in layout
  const imageUrl = caseStudy.imageUrl.startsWith('http') 
    ? caseStudy.imageUrl 
    : new URL(caseStudy.imageUrl, siteUrl).toString();

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `/portfolio/${caseStudy.id}`, 
      images: [
        {
          url: imageUrl,
          width: 600, 
          height: 400, 
          alt: `Image for ${caseStudy.title}`,
        },
      ],
      type: 'article', 
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [imageUrl], 
    },
  };
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const caseStudy = caseStudies.find(cs => cs.id === params.id);

  if (!caseStudy) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <SectionContainer className="pt-24 md:pt-32 lg:pt-36">
          <div className="max-w-4xl mx-auto">
            <Link href="/portfolio" className="inline-flex items-center text-sm text-primary hover:underline mb-8 group">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Portfolio
            </Link>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-6">{caseStudy.title}</h1>
            
            <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-xl mb-8">
              <Image
                src={caseStudy.imageUrl}
                alt={`Detailed image for project: ${caseStudy.title}`}
                fill
                style={{ objectFit: 'cover' }}
                data-ai-hint={caseStudy.imageHint}
                priority 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
              />
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-3">Overview</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{caseStudy.description}</p>
            </div>
            
            {caseStudy.technologiesUsed && caseStudy.technologiesUsed.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-3">Technologies Used</h2> {/* Changed from h3 to h2 */}
                <div className="flex flex-wrap gap-2">
                  {caseStudy.technologiesUsed.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-sm px-3 py-1">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-8 prose prose-lg dark:prose-invert max-w-none text-foreground leading-relaxed">
              <h2 className="text-2xl font-semibold text-foreground mb-3">Project Details</h2>
              <p>{caseStudy.longDescription}</p>
            </div>

            <div className="flex flex-wrap gap-4 mt-10">
              {caseStudy.projectUrl && caseStudy.projectUrl !== '#' && (
                <Button asChild size="lg">
                  <Link href={caseStudy.projectUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-5 w-5" aria-hidden="true" /> View Live Project
                  </Link>
                </Button>
              )}
              {caseStudy.githubUrl && caseStudy.githubUrl !== '#' && (
                <Button asChild variant="outline" size="lg">
                  <Link href={caseStudy.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-5 w-5" aria-hidden="true" /> View on GitHub
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </SectionContainer>
      </main>
      <Footer />
    </div>
  );
}
