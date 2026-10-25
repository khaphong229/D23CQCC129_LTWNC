import React from 'react';

const awards = [
  {
    id: 1,
    title: 'Best UI/UX Design Award',
    organization: 'WebDevCon 2024',
    description: 'Recognized for exceptional user interface design and user experience in the E-Commerce Dashboard project.',
    icon: '🏆',
    color: 'text-yellow-500',
    year: '2024',
  },
  {
    id: 2,
    title: 'Open Source Contributor of the Year',
    organization: 'React Community Awards 2023',
    description: 'Awarded for significant contributions to React ecosystem and creating the Nucleus UI Library.',
    icon: '🌟',
    color: 'text-blue-500',
    year: '2023',
  },
  {
    id: 3,
    title: 'Hackathon Winner',
    organization: 'TechInnovate 2022',
    description: 'First place in the 48-hour hackathon for developing an innovative accessibility solution for web applications.',
    icon: '🚀',
    color: 'text-green-500',
    year: '2022',
  },
];

const certificates = [
  {
    id: 1,
    title: 'Advanced React and Redux',
    organization: 'Frontend Masters (2024)',
    description: 'Comprehensive course covering advanced React patterns, Redux architecture, and performance optimization.',
    icon: '⚛️',
    color: 'text-blue-500',
    year: '2024',
  },
  {
    id: 2,
    title: 'UI/UX Design Fundamentals',
    organization: 'Design Code (2023)',
    description: 'Mastering the principles of user interface design, user experience, and design systems creation.',
    icon: '🎨',
    color: 'text-purple-500',
    year: '2023',
  },
  {
    id: 3,
    title: 'Web Accessibility Specialist',
    organization: 'International Association of Accessibility Professionals (2022)',
    description: 'Professional certification in implementing and auditing web accessibility standards according to WCAG guidelines.',
    icon: '♿',
    color: 'text-green-500',
    year: '2022',
  },
  {
    id: 4,
    title: 'TypeScript Advanced Concepts',
    organization: 'TypeScript Academy (2021)',
    description: 'Deep dive into TypeScript\'s advanced features, generics, and design patterns for large-scale applications.',
    icon: '🔷',
    color: 'text-red-500',
    year: '2021',
  },
];

export default function Certificates() {
  return (
    <section className="py-8 mx-auto max-w-7xl px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white">
          Awards &
          {' '}
          <span className="color-primary-text">Certificates</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Awards Section */}
        <div>
          <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
            Awards
          </h3>
          <div className="space-y-6">
            {awards.map(award => (
              <div
                key={award.id}
                className="group bg-neutral-900/50 backdrop-blur-sm border border-neutral-400/20 rounded-2xl p-6 hover:border-neutral-300/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-start gap-4">
                  <div className={`text-2xl ${award.color} flex-shrink-0 mt-1`}>
                    {award.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                        {award.title}
                      </h4>
                      <span className="text-sm text-blue-400 font-medium">
                        {award.year}
                      </span>
                    </div>
                    <p className="text-blue-400 font-medium text-sm mb-3">
                      {award.organization}
                    </p>
                    <p className="text-neutral-300 text-sm leading-relaxed">
                      {award.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificates Section */}
        <div>
          <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
            Certificates
          </h3>
          <div className="space-y-6">
            {certificates.map(cert => (
              <div
                key={cert.id}
                className="group bg-neutral-900/50 backdrop-blur-sm border border-neutral-400/20 rounded-2xl p-6 hover:border-neutral-300/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-start gap-4">
                  <div className={`text-2xl ${cert.color} flex-shrink-0 mt-1`}>
                    {cert.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                        {cert.title}
                      </h4>
                      <span className="text-sm text-blue-400 font-medium">
                        {cert.year}
                      </span>
                    </div>
                    <p className="text-blue-400 font-medium text-sm mb-3">
                      {cert.organization}
                    </p>
                    <p className="text-neutral-300 text-sm leading-relaxed">
                      {cert.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
