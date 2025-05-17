
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SectionContainer } from '@/components/layout/SectionContainer';

const pageTitle = 'About Us | Ninetech Solutions';
const pageDescription = 'Learn more about Ninetech Solutions, our mission, our team, and our expertise in technology and innovation.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: '/about',
  },
  twitter: {
    title: pageTitle,
    description: pageDescription,
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <SectionContainer id="about-content" className="pt-24 md:pt-32 lg:pt-36">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-6">About Ninetech Solutions</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Innovating the future, one solution at a time.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-8 text-muted-foreground">
            <p className="text-lg leading-relaxed">
              Welcome to Ninetech Solutions! We are a passionate team of technology enthusiasts dedicated to providing cutting-edge solutions in embedded systems, IoT, and web development. Our mission is to empower businesses and individuals by transforming complex challenges into elegant and efficient technological realities.
            </p>
            <p className="text-lg leading-relaxed">
              Founded on the principles of innovation, quality, and client-centricity, Ninetech strives to be at the forefront of technological advancements. We believe in building strong, collaborative partnerships with our clients, understanding their unique needs, and delivering bespoke solutions that drive growth and success.
            </p>
             <p className="text-lg leading-relaxed">
              Our expertise spans across a wide range of services, and we are committed to excellence in every project we undertake. We are constantly exploring new technologies and methodologies to ensure that our clients receive the most advanced and effective solutions.
            </p>
            <p className="text-lg leading-relaxed">
              Content for the About Us page is coming soon. Stay tuned to learn more about our journey, our values, and the people behind Ninetech Solutions.
            </p>
          </div>
        </SectionContainer>
      </main>
      <Footer />
    </div>
  );
}
