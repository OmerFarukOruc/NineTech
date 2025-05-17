
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { BlogPostCard } from '@/components/shared/BlogPostCard';
import { Newspaper } from 'lucide-react';
import { getSortedPostsData } from '@/lib/blog'; // New import

const pageTitle = 'Blog | Ninetech Solutions';
const pageDescription = 'Read the latest articles, news, and insights from the team at Ninetech Solutions. Stay updated on technology trends, embedded systems, IoT, and our projects.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: '/blog',
  },
  twitter: {
    title: pageTitle,
    description: pageDescription,
  },
};

export default function BlogPage() {
  const blogPosts = getSortedPostsData(); // Fetch posts from Markdown files

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <SectionContainer id="blog-content" className="pt-24 md:pt-32 lg:pt-36">
          <div className="text-center mb-12 md:mb-16">
            <Newspaper className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-4">Our Blog</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Insights, news, and updates on embedded systems, IoT, and technology from Ninetech Solutions.
            </p>
          </div>

          {blogPosts && blogPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                // Pass necessary props to BlogPostCard, it expects slug, title, summary, etc. from frontmatter
                <BlogPostCard 
                  key={post.slug} 
                  slug={post.slug}
                  title={post.title}
                  date={post.date}
                  author={post.author}
                  summary={post.summary}
                  imageUrl={post.imageUrl}
                  imageHint={post.imageHint}
                  // tags={post.tags} // Ensure tags are part of the data returned by getSortedPostsData if needed
                />
              ))}
            </div>
          ) : (
            <div className="bg-card p-8 rounded-lg shadow-xl max-w-md mx-auto text-center">
              <h2 className="text-2xl font-semibold text-foreground mb-4">No Posts Yet!</h2>
              <p className="text-muted-foreground">
                We're working hard to bring you insightful articles and updates. Please check back later!
              </p>
            </div>
          )}
        </SectionContainer>
      </main>
      <Footer />
    </div>
  );
}
