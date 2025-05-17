
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CalendarDays, UserCircle } from 'lucide-react';
import { getPostData, getAllPostSlugs, type BlogPostWithHtml } from '@/lib/blog';

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths;
}

export async function generateMetadata(props: BlogPostPageProps): Promise<Metadata> {
  const slug = props.params.slug;
  let post: BlogPostWithHtml;
  try {
    post = await getPostData(slug);
  } catch (error) {
    // Post not found
    return {
      title: 'Blog Post Not Found',
    };
  }

  const pageTitle = `${post.title} | Ninetech Blog`;
  const pageDescription = post.summary;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const imageUrl = post.imageUrl && post.imageUrl.startsWith('http')
    ? post.imageUrl
    : post.imageUrl ? new URL(post.imageUrl, siteUrl).toString() : `${siteUrl}/og-image.png`; // Fallback OG image

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `/blog/${post.slug}`,
      images: [
        {
          url: imageUrl,
          width: 600,
          height: 400,
          alt: `Cover image for ${post.title}`,
        },
      ],
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      authors: post.author ? [post.author] : [],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage(props: BlogPostPageProps) {
  const slug = props.params.slug;
  let post: BlogPostWithHtml;
  try {
    post = await getPostData(slug);
  } catch (error) {
    notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <SectionContainer className="pt-24 md:pt-32 lg:pt-36">
          <div className="max-w-3xl mx-auto">
            <Link href="/blog" className="inline-flex items-center text-sm text-primary hover:underline mb-8 group">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Blog
            </Link>

            <article>
              <header className="mb-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 leading-tight">{post.title}</h1>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    <time dateTime={post.date}>{formattedDate}</time>
                  </div>
                  {post.author && (
                    <div className="flex items-center">
                      <UserCircle className="mr-2 h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                  )}
                </div>
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </header>

              {post.imageUrl && (
                <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden shadow-lg mb-8">
                  <Image
                    src={post.imageUrl}
                    alt={`Cover image for ${post.title}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    data-ai-hint={post.imageHint}
                    priority
                    sizes="(max-width: 768px) 100vw, 896px"
                  />
                </div>
              )}

              <div
                className="prose prose-lg dark:prose-invert max-w-none text-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
              />
            </article>
          </div>
        </SectionContainer>
      </main>
      <Footer />
    </div>
  );
}
