import React from 'react';

const SkillsSection = () => {
  const skills = [
    { name: 'React.js', level: 'Advanced', percentage: 95, color: 'from-blue-500 to-cyan-500' },
    { name: 'JavaScript', level: 'Expert', percentage: 98, color: 'from-yellow-500 to-orange-500' },
    { name: 'TypeScript', level: 'Advanced', percentage: 90, color: 'from-blue-600 to-indigo-600' },
    { name: 'HTML/CSS', level: 'Expert', percentage: 98, color: 'from-orange-500 to-red-500' },
    { name: 'Node.js', level: 'Advanced', percentage: 88, color: 'from-green-500 to-emerald-500' },
    { name: 'Express.js', level: 'Advanced', percentage: 85, color: 'from-gray-600 to-gray-800' },
    { name: 'MongoDB', level: 'Intermediate', percentage: 80, color: 'from-green-600 to-teal-600' },
    { name: 'SQL', level: 'Advanced', percentage: 85, color: 'from-blue-500 to-purple-500' },
    { name: 'Git/GitHub', level: 'Advanced', percentage: 92, color: 'from-purple-500 to-pink-500' },
    { name: 'Tailwind CSS', level: 'Expert', percentage: 95, color: 'from-cyan-500 to-blue-500' },
    { name: 'Next.js', level: 'Advanced', percentage: 88, color: 'from-gray-700 to-black' },
    { name: 'Figma', level: 'Intermediate', percentage: 75, color: 'from-pink-500 to-rose-500' }
  ];

  return (
    <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          My <span className="gradient-text">Skills</span>
        </h2>
        <div className="w-20 h-1 gradient-bg mx-auto rounded-full"></div>
        <p className="text-gray-600 max-w-2xl mx-auto mt-4 dark:text-gray-400">
          Here are the technologies and tools I work with to bring ideas to life.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, index) => (
          <div
            key={skill.name}
            className="group p-6 rounded-xl bg-white dark:bg-gray-800/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {skill.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {skill.level}
                </p>
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {skill.percentage}%
              </span>
            </div>
            
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000`}
                style={{ width: `${skill.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Additional Skills Categories */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Additional <span className="gradient-text">Expertise</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
            <div className="text-4xl mb-4">🎨</div>
            <h4 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">UI/UX Design</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              User-centered design, wireframing, prototyping, and creating intuitive interfaces.
            </p>
          </div>
          
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
            <div className="text-4xl mb-4">📱</div>
            <h4 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Responsive Design</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Mobile-first approach, cross-browser compatibility, and performance optimization.
            </p>
          </div>
          
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
            <div className="text-4xl mb-4">🚀</div>
            <h4 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Performance</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Code optimization, lazy loading, caching strategies, and SEO best practices.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;