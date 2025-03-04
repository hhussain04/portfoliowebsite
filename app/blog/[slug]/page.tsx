import { blogPosts } from '@/lib/blogData';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { remark } from 'remark';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrism from 'rehype-prism-plus';

interface Props {
  params: { slug: string };
}

async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrism, {
      showLineNumbers: true, // Add line numbers for code blocks
      ignoreMissing: true, // Ignore missing languages gracefully
    })
    .use(rehypeStringify)
    .process(markdown);
  return result.toString();
}

export const generateStaticParams = async () => {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
};

export default async function BlogPostPage({ params: { slug } }: Props) {
  const post = blogPosts.find((post) => post.slug === slug);
  if (!post) {
    notFound();
  }

  let contentHtml = '';
  try {
    contentHtml = await markdownToHtml(post.content || '');
  } catch (error) {
    console.error('Error processing Markdown:', error);
    contentHtml = '<p>Sorry, there was an error rendering this post.</p>';
  }

  return (
    <article className="pt-24 max-w-4xl mx-auto space-y-12 bg-background text-foreground">
      <header className="space-y-6">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-[#8A2BE2] to-[#9370DB] bg-clip-text text-transparent dark:text-white">
          {post.title}
        </h1>
        <p className="text-xl text-muted-foreground">{post.excerpt}</p>
        <div className="flex items-center gap-4 text-muted-foreground">
          <Calendar className="h-5 w-5" />
          <span className="text-lg">{format(new Date(post.date), 'MMM d, yyyy')}</span>
          <span className="text-lg">by {post.author}</span>
        </div>
        <div className="flex flex-wrap gap-3">
          {post.tags.map((tag) => (
            <Badge
              key={tag}
              className="bg-[#8A2BE2]/10 text-[#8A2BE2] border border-[#8A2BE2]/20 px-3 py-1 text-sm dark:bg-[#8A2BE2]/20 dark:text-[#9370DB] dark:border-[#9370DB]/20"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </header>
      <div className="prose prose-lg prose-invert max-w-none leading-relaxed dark:prose-invert overflow-x-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-background">
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </div>
    </article>
  );
}