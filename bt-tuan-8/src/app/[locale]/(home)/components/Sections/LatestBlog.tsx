import Link from 'next/link';
import React from 'react';

const blogPosts = [
  {
    id: 1,
    title: 'Building Performant React Applications in 2025',
    description: 'Learn the latest techniques and best practices for building high-performance React applications that your users will love.',
    category: 'React',
    date: 'April 15, 2025',
    readTime: '5 min read',
    image: '/api/placeholder/400/200',
    gradient: 'from-blue-500 to-purple-600',
    icon: '⚛️',
  },
  {
    id: 2,
    title: 'Creating a Scalable Design System from Scratch',
    description: 'A comprehensive guide to building, documenting, and maintaining a design system that grows with your product.',
    category: 'Design Systems',
    date: 'March 28, 2025',
    readTime: '8 min read',
    image: '/api/placeholder/400/200',
    gradient: 'from-purple-500 to-pink-500',
    icon: '🎨',
  },
  {
    id: 3,
    title: 'Web Accessibility: Beyond the Basics',
    description: 'Dive deep into advanced accessibility techniques that will make your web applications truly inclusive for all users.',
    category: 'Accessibility',
    date: 'February 10, 2025',
    readTime: '6 min read',
    image: '/api/placeholder/400/200',
    gradient: 'from-yellow-400 to-orange-500',
    icon: '♿',
  },
];

export default function LatestBlog() {
  return (
    <section className="py-8 mx-auto max-w-7xl px-6">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-3xl font-bold text-white">
          Latest
          {' '}
          <span className="color-primary-text">Blog Posts</span>
        </h2>
        <Link
          href="/blog"
          className="text-[14px] text-blue-400 hover:text-blue-300 transition-colors duration-300 flex items-center gap-2"
        >
          View all posts
          {' '}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-move-right-icon lucide-move-right">
            <path d="M18 8L22 12L18 16" />
            <path d="M2 12H22" />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map(post => (
          <article
            key={post.id}
            className="group rounded-2xl overflow-hidden border border-neutral-400/20 hover:border-neutral-300/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl bg-neutral-900/50 backdrop-blur-sm"
          >
            {/* Card Header with Gradient Background */}
            <div className={`relative h-48 bg-gradient-to-br ${post.gradient} p-6 flex items-center justify-center`}>
              <div className="text-6xl opacity-20">
                {post.icon}
              </div>
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm text-white">
                  {post.category}
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6">
              <div className="flex items-center gap-2 text-sm text-neutral-400 mb-3">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                {post.title}
              </h3>

              <p className="text-neutral-300 text-sm leading-relaxed mb-4 line-clamp-3">
                {post.description}
              </p>

              <Link
                href={`/blog/${post.id}`}
                className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300 text-sm font-medium"
              >
                Read more
                {' '}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-move-right-icon lucide-move-right">
                  <path d="M18 8L22 12L18 16" />
                  <path d="M2 12H22" />
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
