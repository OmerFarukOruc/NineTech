import { SectionContainer } from '@/components/layout/SectionContainer';
import { CaseStudyCard } from '@/components/shared/CaseStudyCard';
import { caseStudies } from '@/lib/data'; // Import from new data file

export function CaseStudiesSection() {
  return (
    <SectionContainer id="portfolio" className="bg-secondary">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Case Studies</h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          A selection of projects demonstrating my skills and expertise.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {caseStudies.map((caseStudy) => (
          <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
        ))}
      </div>
    </SectionContainer>
  );
}
