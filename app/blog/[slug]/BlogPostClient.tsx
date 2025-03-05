"use client";

import { BlogPost } from '@/lib/types';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { remark } from 'remark';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrism from 'rehype-prism-plus';

interface Props {
  post: BlogPost;
}

async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrism, {
      showLineNumbers: true,
      ignoreMissing: true,
    })
    .use(rehypeStringify)
    .process(markdown);
  return result.toString();
}

export default async function BlogPostClient({ post }: Props) {
  let contentHtml = '';
  try {
    contentHtml = await markdownToHtml(post.content || '');
  } catch (error) {
    console.error('Error processing Markdown:', error);
    contentHtml = '<p>Sorry, there was an error rendering this post.</p>';
  }

  return (
    <article className="pt-24 max-w-4xl mx-auto space-y-12 bg-background text-foreground overflow-x-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-background">
      {/* Header Section */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8 p-6 bg-black/40 backdrop-blur-md rounded-2xl border border-[#8A2BE2]/20 shadow-lg shadow-[#8A2BE2]/10"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#8A2BE2] to-[#9370DB] bg-clip-text text-transparent dark:text-white">
          {post.title}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-4 text-muted-foreground">
          <Calendar className="h-5 w-5 text-[#8A2BE2]" />
          <span className="text-base md:text-lg font-medium">{format(new Date(post.date), 'MMM d, yyyy')}</span>
          <span className="text-base md:text-lg font-medium">by {post.author}</span>
        </div>
        <div className="flex flex-wrap gap-3">
          {post.tags.map((tag) => (
            <Badge
              key={tag}
              className="bg-[#8A2BE2]/10 text-[#8A2BE2] border border-[#8A2BE2]/20 px-3 py-1 text-sm font-medium hover:bg-[#8A2BE2] hover:text-white transition-colors duration-200"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </motion.header>

      {/* Content Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="p-6 bg-black/30 backdrop-blur-md rounded-2xl border border-[#8A2BE2]/10 shadow-md shadow-[#8A2BE2]/5 prose prose-lg prose-invert max-w-none leading-relaxed"
      >
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </motion.div>
    </article>
  );
}