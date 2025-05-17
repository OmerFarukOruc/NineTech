
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import type { BlogPost } from './types'; // Assuming BlogPost type is defined here

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

export interface BlogPostWithHtml extends BlogPost {
  contentHtml: string;
}

export function getSortedPostsData(): Omit<BlogPostWithHtml, 'contentHtml'>[] {
  // Get file names under /src/content/blog
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const slug = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      slug,
      title: matterResult.data.title as string,
      date: matterResult.data.date as string,
      author: matterResult.data.author as string | undefined,
      summary: matterResult.data.summary as string,
      imageUrl: matterResult.data.imageUrl as string,
      imageHint: matterResult.data.imageHint as string,
      tags: matterResult.data.tags as string[] | undefined,
      // ...matterResult.data, // We can spread the rest if needed, but ensure types match
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      slug: fileName.replace(/\.md$/, ''),
    };
  });
}

export async function getPostData(slug: string): Promise<BlogPostWithHtml> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    slug,
    contentHtml,
    title: matterResult.data.title as string,
    date: matterResult.data.date as string,
    author: matterResult.data.author as string | undefined,
    summary: matterResult.data.summary as string,
    imageUrl: matterResult.data.imageUrl as string,
    imageHint: matterResult.data.imageHint as string,
    tags: matterResult.data.tags as string[] | undefined,
  };
}
