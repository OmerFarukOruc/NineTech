
// import type { BlogPost } from '@/lib/types'; // Using props directly for now
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge'; // Tags are not passed currently
import { CalendarDays, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

interface BlogPostCardProps {
  slug: string;
  title: string;
  date: string;
  author?: string;
  summary: string;
  imageUrl: string;
  imageHint: string;
  // tags?: string[]; // Uncomment if tags are added back
}

export function BlogPostCard({ 
  slug, 
  title, 
  date, 
  author, 
  summary, 
  imageUrl, 
  imageHint, 
  // tags 
}: BlogPostCardProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Link href={`/blog/${slug}`} passHref legacyBehavior>
        <a className="block hover:cursor-pointer group" aria-label={`Read more about ${title}`}>
          {imageUrl && (
            <div className="relative w-full h-48 sm:h-56 overflow-hidden">
              <Image
                src={imageUrl}
                alt={`Cover image for blog post: ${title}`}
                fill
                style={{ objectFit: 'cover' }}
                className="group-hover:scale-105 transition-transform duration-300"
                data-ai-hint={imageHint}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}
          <CardHeader className="pb-3">
            <CardTitle className="text-xl group-hover:text-primary transition-colors">{title}</CardTitle>
          </CardHeader>
          <CardContent className="pb-4 flex-grow">
            <div className="flex items-center text-xs text-muted-foreground mb-2">
              <CalendarDays className="mr-2 h-4 w-4" />
              <span>{formattedDate}</span>
              {author && <span className="mx-1">•</span>}
              {author && <span>By {author}</span>}
            </div>
            <CardDescription className="text-sm min-h-[4.5rem] line-clamp-3">{summary}</CardDescription>
          </CardContent>
        </a>
      </Link>
      <CardFooter className="pt-2 pb-4">
        <Button asChild variant="link" className="p-0 h-auto text-sm text-primary hover:underline">
          <Link href={`/blog/${slug}`}>
            Read More <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
        {/* {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
                {tag}
              </Badge>
            ))}
          </div>
        )} */}
      </CardFooter>
    </Card>
  );
}
