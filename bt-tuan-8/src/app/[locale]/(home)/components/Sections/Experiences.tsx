import React from 'react';

const experiences = [
  {
    id: 1,
    period: '01/2025 - Present',
    position: 'Frontend Developer',
    company: 'Axtra Labs',
    companyIcon: '',
    description: 'Front-end & React Native Intern',
    achievements: [
      'Gained hands-on experience in front-end development using HTML, CSS, JavaScript, and ReactJS',
      'Built and optimized responsive web interfaces focused on user experience',
      'Explored mobile app development with React Native, including creating UI components and working with APIs',
      'Collaborated with the team in Agile workflows, contributing to real-world projects and code reviews',
    ],
  },
  {
    id: 2,
    period: '10/2023 - Present',
    position: 'Content Creator',
    company: 'Youtube',
    companyIcon: '',
    description: 'Produce both technical and non-technical videos that share knowledge and inspire young people to explore careers in technology.',
    achievements: [
      'Grew a YouTube channel to 3,000+ subscribers and over 40,000 views, building a supportive and curious community.',
    ],
  },
];

export default function Experiences() {
  return (
    <section className="py-6 px-4 sm:py-8 sm:px-6 mx-auto max-w-4xl">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Work
          {' '}
          <span className="color-primary-text">Experience</span>
        </h2>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="hidden sm:block absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-transparent"></div>

        <div className="space-y-8 sm:space-y-12">
          {experiences.map(exp => (
            <div key={exp.id} className="relative flex flex-col sm:flex-row items-start group">
              {/* Timeline dot */}
              <div className="hidden sm:block absolute left-2 sm:left-6 w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full border-4 border-neutral-900 group-hover:bg-purple-500 transition-colors duration-300 z-10"></div>

              {/* Period */}
              <div className="w-28 sm:w-42 flex-shrink-0 text-right pr-0 mb-2 sm:mb-0">
                <span className="text-blue-400 font-medium text-xs sm:text-sm">
                  {exp.period}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 sm:ml-8">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                  {exp.position}
                </h3>
                <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-400/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-neutral-300/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  {/* Header */}
                  <div className="flex items-start gap-2 sm:gap-4 mb-3 sm:mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-1 sm:gap-2 text-blue-400">
                        <span className="text-xs sm:text-sm">{exp.companyIcon}</span>
                        <span className="font-medium">{exp.company}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-neutral-300 mb-3 sm:mb-4 leading-relaxed text-xs sm:text-base">
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <div className="space-y-1 sm:space-y-2">
                    {exp.achievements.map((achievement, achievementIndex) => (
                      <div key={achievementIndex} className="flex items-start gap-2 sm:gap-3">
                        <span className="text-green-400 mt-1 flex-shrink-0 text-xs sm:text-base">✓</span>
                        <span className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                          {achievement}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
