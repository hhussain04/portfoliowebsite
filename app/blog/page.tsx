'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { blogPosts } from '@/lib/blogData';
import { Calendar } from 'lucide-react';

export default function BlogPage() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-12 pt-24 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#8A2BE2] to-[#9370DB] bg-clip-text text-transparent">
          Blog
        </h1>
        <p className="text-lg text-muted-foreground">
          Insights, tutorials, and thoughts on software development.
        </p>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {blogPosts.map((post) => (
  <motion.div key={post.id} variants={item}>
    <Card className="p-6 bg-black/40 backdrop-blur-md border border-[#8A2BE2]/20 hover:border-[#8A2BE2]/50 transition-colors">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{post.title}</h2>
        <p className="text-muted-foreground">{post.excerpt}</p>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} className="bg-[#8A2BE2]/10 text-[#8A2BE2] border border-[#8A2BE2]/20">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Calendar className="h-4 w-4" /> {post.date}
          </span>
          <Button asChild variant="outline" className="border-[#8A2BE2] text-[#8A2BE2] hover:bg-[#8A2BE2] hover:text-white">
            <Link href={`/blog/${post.slug}`}>Read More</Link>
          </Button>
        </div>
      </div>
    </Card>
  </motion.div>
))}
      </motion.div>
    </div>
  );
}