import {
  CSS3,
  ExpressJsLight,
  GitHubLight,
  HTML5,
  JavaScript,
  MongoDB,
  NestJS,
  NextJs,
  React,
  Sass,
  TailwindCSS,
  TypeScript,
} from 'developer-icons';

const techData = [
  {
    name: 'React',
    description: 'Component-based UI development',
    icon: <React />,
    color: 'text-blue-500',
  },
  {
    name: 'JavaScript',
    description: 'Core language for web development',
    icon: <JavaScript />,
    color: 'text-yellow-500',
  },
  {
    name: 'TypeScript',
    description: 'Type-safe JavaScript development',
    icon: <TypeScript />,
    color: 'text-blue-600',
  },
  {
    name: 'HTML5',
    description: 'Semantic markup and structure',
    icon: <HTML5 />,
    color: 'text-orange-500',
  },
  {
    name: 'CSS3',
    description: 'Styling and animations',
    icon: <CSS3 />,
    color: 'text-blue-400',
  },
  {
    name: 'Sass',
    description: 'CSS preprocessor',
    icon: <Sass />,
    color: 'text-pink-500',
  },
  {
    name: 'Tailwind CSS',
    description: 'Utility-first CSS framework',
    icon: <TailwindCSS />,
    color: 'text-cyan-500',
  },
  {
    name: 'Next.js',
    description: 'React framework for production',
    icon: <NextJs />,
    color: 'text-black',
  },
  {
    name: 'Git',
    description: 'Version control system',
    icon: <GitHubLight />,
    color: 'text-orange-600',
  },
  {
    name: 'NestJS',
    description: 'JavaScript testing framework',
    icon: <NestJS />,
    color: 'text-red-600',
  },
  {
    name: 'MongoDB',
    description: 'Multi-device compatibility',
    icon: <MongoDB />,
    color: 'text-green-500',
  },
  {
    name: 'Express.js',
    description: 'WCAG standards implementation',
    icon: <ExpressJsLight />,
    color: 'text-blue-700',
  },
];

export default function TechStack() {
  return (
    <section className="py-12 mx-auto max-w-7xl px-6 ">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white">
          Tech
          {' '}
          <span className="color-primary-text">Stack</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {techData.map((tech, index) => (
          <div
            key={index}
            className="rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-neutral-400/40"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className={`${tech.color} flex items-center justify-center w-10 h-10`}>
                {tech.icon}
              </div>
              <div>
                <h3 className="text-[14px] text-foreground mb-2">
                  {tech.name}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
