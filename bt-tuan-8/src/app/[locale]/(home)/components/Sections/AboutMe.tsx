import React from 'react';

export default function AboutMe() {
  return (
    <section className="pb-12 mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10 text-white">
        About
        {' '}
        <span className="color-primary-text">Me</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-white">
        {/* My Journey */}
        <div className="bg-[#1f2937] p-4 rounded-lg shadow-lg xl:bg-transparent xl:p-0 xl:rounded-none xl:shadow-none">
          <h3 className="hidden xl:block text-xl font-semibold mb-4">My Journey</h3>
          <p className="mb-3 text-base text-gray-300">
            I'm currently an intern and a university student, actively learning and gaining hands-on experience in website and app development. My journey is focused on exploring modern web technologies like React, TypeScript, and Node.js, and I'm eager to build real-world projects to strengthen my skills and prepare for a professional career in software engineering.
          </p>
          <p className="text-base text-gray-300">
            Currently, I also create content on YouTube, constantly exploring new ideas to grow and develop my skills.
          </p>
        </div>
        {/* What I Do */}
        <div className="hidden xl:block">
          <h3 className="text-xl font-semibold mb-4">What I Do</h3>
          <ul className="space-y-5">
            <li className="flex items-center gap-3">
              {/* <div className="border border-[#2563eb]-400/40 bg-[#2563eb]/20 rounded-[8px] p-2"> */}
              <span className="text-[#2563eb] text-xl">
                {/* Frontend icon */}
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M4 17V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12" />
                  <rect x="2" y="17" width="20" height="5" rx="2" />
                  <path d="M8 13h8" />
                </svg>
              </span>
              {/* </div> */}
              <div>
                <span className="font-semibold">Frontend Development</span>
                <div className="text-gray-300 text-sm">
                  Building modern web applications with React, Next.js, and TypeScript
                </div>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-[#7b6cf6] text-xl">
                {/* UI/UX icon */}
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="7" height="7" rx="1.5" />
                  <rect x="14" y="3" width="7" height="7" rx="1.5" />
                  <rect x="14" y="14" width="7" height="7" rx="1.5" />
                  <rect x="3" y="14" width="7" height="7" rx="1.5" />
                </svg>
              </span>
              <div>
                <span className="font-semibold">Backend Development</span>
                <div className="text-gray-300 text-sm">
                  Developing robust backend systems and APIs using Node.js, NestjS and MongooDB
                </div>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-[#4ade80] text-xl">
                {/* Design System icon */}
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </span>
              <div>
                <span className="font-semibold">Content Creator</span>
                <div className="text-gray-300 text-sm">
                  I am currently creating content on YouTube, sharing knowledge and experiences related to technology and software development.
                </div>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-[#f87171] text-xl">
                {/* Team Leadership icon */}
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="9" cy="7" r="4" />
                  <path d="M17 11v2a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-2" />
                  <circle cx="17" cy="17" r="4" />
                </svg>
              </span>
              <div>
                <span className="font-semibold">Team Leadership</span>
                <div className="text-gray-300 text-sm">
                  Mentoring junior developers and leading frontend teams in university projects. As a beginner, I encourage knowledge sharing and help my team overcome technical challenges.
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
