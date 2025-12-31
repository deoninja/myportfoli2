import React from 'react';
import {
  FaJs, FaReact, FaVuejs, FaNodeJs, FaLaravel, FaPhp, FaHtml5, FaCss3Alt,
  FaDatabase, FaGitAlt, FaDocker, FaCode
} from 'react-icons/fa';

function Skills() {
  const skills = [
    { icon: <FaJs className="mr-1 sm:mr-2 text-yellow-500" />, name: 'JavaScript (ES6+)' },
    { icon: <FaCode className="mr-1 sm:mr-2 text-blue-600" />, name: 'TypeScript' },
    { icon: <FaHtml5 className="mr-1 sm:mr-2 text-orange-500" />, name: 'HTML5' },
    { icon: <FaCss3Alt className="mr-1 sm:mr-2 text-blue-500" />, name: 'CSS3' },
    { icon: <FaPhp className="mr-1 sm:mr-2 text-purple-500" />, name: 'PHP' },
    { icon: <FaReact className="mr-1 sm:mr-2 text-blue-400" />, name: 'React.js' },
    { icon: <FaVuejs className="mr-1 sm:mr-2 text-green-500" />, name: 'Vue.js' },
    { icon: <FaCss3Alt className="mr-1 sm:mr-2 text-teal-400" />, name: 'Tailwind CSS' },
    { icon: <FaCss3Alt className="mr-1 sm:mr-2 text-purple-600" />, name: 'Bootstrap' },
    { icon: <FaCode className="mr-1 sm:mr-2 text-blue-700" />, name: 'WordPress' },
    { icon: <FaNodeJs className="mr-1 sm:mr-2 text-green-600" />, name: 'Node.js' },
    { icon: <FaLaravel className="mr-1 sm:mr-2 text-red-500" />, name: 'Laravel' },
    { icon: <FaGitAlt className="mr-1 sm:mr-2 text-orange-600" />, name: 'Git' },
    { icon: <FaCode className="mr-1 sm:mr-2 text-blue-600" />, name: 'Bitbucket' },
    { icon: <FaDocker className="mr-1 sm:mr-2 text-blue-400" />, name: 'Docker' },
    { icon: <FaCode className="mr-1 sm:mr-2 text-orange-500" />, name: 'Postman' },
    { icon: <FaCode className="mr-1 sm:mr-2 text-gray-600" />, name: 'RESTful API' },
    { icon: <FaCode className="mr-1 sm:mr-2 text-purple-600" />, name: 'Google AI Studio' },
    { icon: <FaCode className="mr-1 sm:mr-2 text-pink-500" />, name: 'n8n' },
  ];

  return (
    <section className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-xl transition-all">
      <h2 className="text-xl sm:text-2xl font-bold text-blue-700 border-b pb-2 mb-3 sm:mb-4 flex items-center">
        <FaJs className="mr-2 sm:mr-3 text-blue-500" />
        Technical Skills
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {skills.map((skill, index) => (
          <div key={index} className="skill-badge bg-blue-50 text-blue-700 px-3 sm:px-4 py-1 sm:py-2 rounded-lg flex items-center text-sm sm:text-base">
            {skill.icon} {skill.name}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;