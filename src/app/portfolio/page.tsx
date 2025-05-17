
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { CaseStudyCard } from '@/components/shared/CaseStudyCard';
import { caseStudies } from '@/lib/data';

const pageTitle = 'Portfolio - Our Work | Ninetech';
const pageDescription = 'Browse through the case studies and projects successfully delivered by Ninetech, showcasing expertise in tech solutions.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: '/portfolio', // Relative to metadataBase
    // images: [ // You can add a specific OG image for this page
    //   {
    //     url: '/og-portfolio.png', 
    //     width: 1200,
    //     height: 630,
    //     alt: 'Ninetech Portfolio Showcase',
    //   },
    // ],
  },
  twitter: {
    title: pageTitle,
    description: pageDescription,
    // images: ['/twitter-portfolio.png'], 
  },
};

export default function PortfolioPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <SectionContainer id="portfolio-content" className="pt-24 md:pt-32 lg:pt-32">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-6">Our Work</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Take a look at some of the projects we've successfully delivered.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((caseStudy) => (
              <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
            ))}
          </div>
        </SectionContainer>
      </main>
      <Footer />
    </div>
  );
}
