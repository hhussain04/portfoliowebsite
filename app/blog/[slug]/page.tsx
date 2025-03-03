import { blogPosts } from '@/lib/blogData';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { remark } from 'remark';
import html from 'remark-html';
import rehypeStringify from "rehype-stringify";

interface Props {
  params: { slug: string };
}

async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(html)
    .use(rehypeStringify)
    .process(markdown);
  return result.toString();
}

export default async function BlogPostPage({ params: { slug } }: Props) {
  const post = blogPosts.find((post) => post.slug === slug);

  if (!post) {
    notFound(); // Return a 404 if the post doesn't exist
  }

  const contentHtml = await markdownToHtml(post.content || '');

  return (
    <article className="pt-24 max-w-4xl mx-auto space-y-6">
      <header className="space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#8A2BE2] to-[#9370DB] bg-clip-text text-transparent">
          {post.title}
        </h1>
        <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{format(new Date(post.date), 'MMM d, yyyy')}</span>
        </div>
        <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} className="bg-[#8A2BE2]/10 text-[#8A2BE2] border border-[#8A2BE2]/20">
                {tag}
              </Badge>
            ))}
          </div>
      </header>

      <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: contentHtml }}/>
    </article>
  );
}