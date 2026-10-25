import Link from 'next/link';
import React from 'react';

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  gradient: string;
  featured: boolean;
  appStoreUrl?: string;
  googlePlayUrl?: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: 'Blog Portfolio',
    description: 'A modern personal blog and portfolio built with Next.js, Tailwind CSS, and TypeScript. Features responsive design, animated UI, and sections for introduction, about, and project showcase. Optimized for performance and accessibility.',
    image: '/api/placeholder/500/300',
    tags: ['NextJS', 'TypeScript', 'Tailwind CSS'],
    demoUrl: 'https://khaphong.io.vn/',
    githubUrl: 'https://github.com/khaphong229/blog-nextjs-frontend',
    gradient: 'from-blue-600 to-purple-700',
    featured: true,
  },
  {
    id: 2,
    title: 'Refslink',
    description: 'Front-end of Website Refslink - Shortlink Management To Earn Money Online',
    image: '/api/placeholder/500/300',
    tags: ['ReactJS', 'Ant Design', 'TypeScript'],
    demoUrl: 'https://refslink.onrender.com/',
    githubUrl: 'https://github.com/khaphong229/Refslink-front-end-base-umi',
    gradient: 'from-teal-500 to-cyan-600',
    featured: true,
  },
  {
    id: 3,
    title: 'Trao Do Cu',
    description: 'Web interface for the old-item exchange platform, built with ReactJS, supporting posting, searching, and account items.',
    image: '/api/placeholder/500/300',
    tags: ['ReactJS', 'Redux', 'Ant Design'],
    demoUrl: 'https://traodocu.khaphong.io.vn/',
    githubUrl: 'https://github.com/khaphong229/trao-do-cu-front-end',
    gradient: 'from-orange-500 to-red-600',
    featured: true,
  },
];

export default function Projects() {
  return (
    <section className="py-8 mx-auto max-w-7xl px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white">
          Featured
          {' '}
          <span className="color-primary-text">Projects</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {projects.map(project => (
          <div
            key={project.id}
            className="group rounded-2xl overflow-hidden border border-neutral-400/20 hover:border-neutral-300/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl bg-neutral-900/50 backdrop-blur-sm"
          >
            {/* Project Image */}
            <div className={`relative h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}>
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10 text-white text-center p-6">
                <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mb-4 mx-auto backdrop-blur-sm">
                  <span className="text-2xl">📱</span>
                </div>
              </div>
            </div>

            {/* Project Content */}
            <div className="p-6">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-lg font-semibold">{project.title}</h3>

              {/* Description */}
              <p className="text-neutral-300 text-sm leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-300"
                  >
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    className="flex items-center gap-2 px-4 py-2 border border-neutral-400/40 hover:border-neutral-300/60 text-neutral-300 hover:text-white text-sm font-medium rounded-lg transition-all duration-300"
                  >
                    <span>⭐</span>
                    GitHub
                  </a>
                )}
                {project.appStoreUrl && (
                  <a
                    href={project.appStoreUrl}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-300"
                  >
                    <span>📱</span>
                    App Store
                  </a>
                )}
                {project.googlePlayUrl && (
                  <a
                    href={project.googlePlayUrl}
                    className="flex items-center gap-2 px-4 py-2 border border-neutral-400/40 hover:border-neutral-300/60 text-neutral-300 hover:text-white text-sm font-medium rounded-lg transition-all duration-300"
                  >
                    <span>🤖</span>
                    Google Play
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Projects Button - Changed to Link */}
      <div className="text-center">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white rounded-lg transition-all duration-300 font-medium"
        >
          View All Projects →
        </Link>
      </div>
    </section>
  );
}
