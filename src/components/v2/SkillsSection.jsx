import useScrollAnimation, { useStaggeredAnimation } from '../../hooks/useScrollAnimation';

const SkillBar = ({ name, percentage, isVisible, delay = 0 }) => (
  <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`} style={{ transitionDelay: `${delay}ms` }}>
    <div className="flex justify-between mb-2">
      <span className="font-medium text-gray-700 dark:text-gray-300">{name}</span>
      <span className="text-gray-600 dark:text-gray-400">{percentage}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden">
      <div 
        className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2.5 rounded-full transition-all duration-1000 ease-out"
        style={{ 
          width: isVisible ? `${percentage}%` : '0%',
          transitionDelay: `${delay + 200}ms`
        }}
      ></div>
    </div>
  </div>
);

function SkillsSection() {
  const [titleRef, titleVisible] = useScrollAnimation(0.3);
  const [skillsRef, skillsVisible] = useScrollAnimation(0.2);
  const [toolsRef, toolsVisible] = useStaggeredAnimation(9, 100);

  return (
    <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-12">
      <div 
        ref={titleRef}
        className={`text-center mb-12 transition-all duration-1000 ${
          titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          My <span className="gradient-text">Skills</span>
        </h2>
        <div className="w-20 h-1 gradient-bg mx-auto rounded-full"></div>
      </div>
      <div 
        ref={skillsRef}
        className={`grid grid-cols-1 md:grid-cols-2 gap-12 transition-all duration-1000 delay-300 ${
          skillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div>
          <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">Technical Skills</h3>
          <div className="space-y-6">
            <SkillBar name="JavaScript" percentage={95} isVisible={skillsVisible} delay={0} />
            <SkillBar name="React" percentage={90} isVisible={skillsVisible} delay={100} />
            <SkillBar name="Node.js" percentage={85} isVisible={skillsVisible} delay={200} />
            <SkillBar name="HTML/CSS" percentage={95} isVisible={skillsVisible} delay={300} />
            <SkillBar name="Databases (SQL/NoSQL)" percentage={80} isVisible={skillsVisible} delay={400} />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">Professional Skills</h3>
          <div className="space-y-6">
            <SkillBar name="Communication" percentage={90} isVisible={skillsVisible} delay={500} />
            <SkillBar name="Teamwork" percentage={85} isVisible={skillsVisible} delay={600} />
            <SkillBar name="Problem Solving" percentage={95} isVisible={skillsVisible} delay={700} />
            <SkillBar name="Creativity" percentage={80} isVisible={skillsVisible} delay={800} />
            <SkillBar name="Adaptability" percentage={90} isVisible={skillsVisible} delay={900} />
          </div>
        </div>
      </div>
      <div className="mt-16">
        <h3 className={`text-xl font-semibold mb-8 text-center text-gray-800 dark:text-white transition-all duration-1000 ${
          toolsVisible.size > 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>Tools & Technologies</h3>
        <div ref={toolsRef} className="flex flex-wrap justify-center gap-8">
          {[
            { icon: 'react', name: 'React', color: '#61DAFB' },
            { icon: 'node-js', name: 'Node.js', color: '#68A063' },
            { icon: 'js', name: 'JavaScript', color: '#F7DF1E' },
            { icon: 'html5', name: 'HTML5', color: '#E34F26' },
            { icon: 'css3-alt', name: 'CSS3', color: '#1572B6' },
            { icon: 'git-alt', name: 'Git', color: '#F05032' },
            { icon: 'figma', name: 'Figma', color: '#F24E1E' },
            { icon: 'database', name: 'SQL/NoSQL', color: '#475569', prefix: 'fas' },
            { icon: 'docker', name: 'Docker', color: '#2496ED' },
          ].map((tool, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center text-center transition-all duration-700 transform hover:scale-110 ${
                toolsVisible.has(index) 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-8 scale-75'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-20 h-20 rounded-full shadow-lg flex items-center justify-center mb-3 bg-white dark:bg-gray-800">
                <i className={`${tool.prefix || 'fab'} fa-${tool.icon} text-4xl`} style={{ color: tool.color }}></i>
              </div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{tool.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
