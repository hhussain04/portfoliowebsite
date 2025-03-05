import { blogPosts } from '@/lib/blogData';
import { notFound } from 'next/navigation';
import BlogPostClient from './BlogPostClient'; // Import the Client Component

export const generateStaticParams = async () => {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((post) => post.slug === params.slug);
  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}