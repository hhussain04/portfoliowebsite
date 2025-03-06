"use client";

import { BlogPost } from '@/lib/types';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface Props {
  post: BlogPost;
}

export default function BlogPostClient({ post }: Props) {
  return (
    <article className="pt-24 max-w-4xl mx-auto space-y-12">
      {/* Header Section */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 bg-black/40 backdrop-blur-md rounded-2xl border border-[#8A2BE2]/20 shadow-lg shadow-[#8A2BE2]/10 blog-header"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#8A2BE2] to-[#9370DB] bg-clip-text text-transparent dark:text-white">
          {post.title}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mt-4">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-4 text-muted-foreground mt-4">
          <Calendar className="h-5 w-5 text-[#8A2BE2]" />
          <span className="text-base md:text-lg font-medium">
            {format(new Date(post.date), 'MMM d, yyyy')}
          </span>
          <span className="text-base md:text-lg font-medium">by {post.author}</span>
        </div>
        <div className="flex flex-wrap gap-3 mt-4 blog-tags">
          {post.tags.map((tag) => (
            <Badge
              key={tag}
              className="bg-[#8A2BE2]/10 text-[#8A2BE2] border border-[#8A2BE2]/20 px-3 py-1 text-sm font-medium hover:bg-[#8A2BE2] hover:text-white transition-colors duration-200 blog-tag"
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
        className="p-6 bg-black/30 backdrop-blur-md rounded-2xl border border-[#8A2BE2]/10 shadow-md shadow-[#8A2BE2]/5 blog-post prose prose-lg prose-invert max-w-none leading-relaxed space-y-6"
      >
        {post.content.sections.map((section, index) => (
          <div key={index}>
            {section.heading.level === 2 ? (
              <h2 className="text-2xl font-bold mb-4 mt-8 text-white">
                {section.heading.text}
              </h2>
            ) : section.heading.level === 3 ? (
              <h3 className="text-xl font-bold mb-4 mt-6 text-white">
                {section.heading.text}
              </h3>
            ) : null}
            {section.paragraphs.map((paragraph, pIndex) => (
              <p key={pIndex} className="mb-4 text-lg">
                {paragraph}
              </p>
            ))}
            {section.codeBlocks?.map((codeBlock, cIndex) => (
              <pre key={cIndex} className="bg-card text-foreground p-6 rounded-lg overflow-x-auto font-mono border border-[#8A2BE2]/20 shadow-md shadow-[#8A2BE2]/10">
                <code>{codeBlock.code}</code>
              </pre>
            ))}
            {section.lists?.map((list, lIndex) => (
              <div key={lIndex} className="mb-4">
                {list.ordered ? (
                  <ol className="list-decimal pl-6 mb-4 text-lg">
                    {list.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="mb-2">
                        {item}
                      </li>
                    ))}
                  </ol>
                ) : (
                  <ul className="list-disc pl-6 mb-4 text-lg">
                    {list.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="mb-2">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </article>
  );
}