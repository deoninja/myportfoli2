import React, { useState } from 'react';
import { FaBriefcase } from 'react-icons/fa';

function Experience() {
  const [expanded, setExpanded] = useState([]);

  const experiences = [
    {
      title: 'Frontend Engineer',
      company: '8box Solutions, Quezon City',
      duration: 'September 2024 - Present',
      responsibilities: [
        'Led the development of 10+ React-based web applications, ensuring scalable architecture and interactive user interfaces.',
        'Boosted application performance by 40% through advanced optimization techniques including lazy loading, memoization, and code splitting.',
        'Conducted rigorous code reviews and mentored junior developers, fostering best practices for clean, maintainable, and efficient code.',
      ],
    },
    {
      title: 'React/Vue Developer',
      company: 'LBTEK Systems, Caloocan',
      duration: 'January 2021 - September 2024',
      responsibilities: [
        'Built and maintained dynamic admin dashboards, incorporating user login and document upload functionalities.',
        'Integrated REST APIs for real-time data flow, ensuring seamless user experiences and efficient backend communication.',
        'Managed production deployments, ensuring 99.9% uptime post-release and robust cross-browser compatibility.',
        'Utilized Git/Bitbucket for version control and actively collaborated in an Agile development environment.',
      ],
    },
    {
      title: 'WordPress / Laravel Developer',
      company: 'Hivelabs, Malabon',
      duration: 'August 2020 - January 2021',
      responsibilities: [
        'Delivered custom WordPress themes and robust Laravel solutions, ensuring responsive UI designs within tight deadlines.',
        'Handled extensive bug fixing, troubleshooting, and code refactoring for legacy systems, improving overall application stability.',
        'Implemented CMS-integrated functionality, focusing on intuitive user experience and maintainable code.',
      ],
    },
    {
      title: 'Computer Instructor',
      company: 'Premiere Computer Learning Center, Parañaque',
      duration: 'June 2019 - August 2020',
      responsibilities: [
        'Delivered lessons in basic to intermediate programming and computer skills, enhancing foundational understanding.',
      ],
    },
  ];

  const toggleExpand = (index) => {
    setExpanded((prev) => {
      const newExpanded = [...prev];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };

  return (
    <section className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-xl transition-all">
      <h2 className="text-xl sm:text-2xl font-bold text-blue-700 border-b pb-2 mb-4 sm:mb-6 flex items-center">
        <FaBriefcase className="mr-2 sm:mr-3 text-blue-500" />
        Work Experience
      </h2>
      <div className="relative space-y-6 sm:space-y-8">
        {experiences.map((exp, index) => (
          <div key={index} className="relative pl-6 sm:pl-8">
            {/* Timeline Dot and Line */}
            <div className="absolute left-0 top-0 w-4 h-4 sm:w-5 sm:h-5 bg-blue-600 rounded-full border-2 border-white"></div>
            {index !== experiences.length - 1 && (
              <div className="absolute left-[7px] sm:left-[9px] top-4 sm:top-5 h-[calc(100%-1rem)] w-0.5 bg-blue-200"></div>
            )}
            {/* Job Entry */}
            <div className="bg-gray-50 p-4 sm:p-5 rounded-lg border border-gray-200 hover:bg-gray-100 transition">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{exp.title}</h3>
              <p className="text-sm sm:text-base text-gray-600 mt-1">{exp.company}</p>
              <p className="text-xs sm:text-sm text-gray-500 italic">{exp.duration}</p>
              {expanded[index] && (
                <ul className="mt-3 sm:mt-4 space-y-2 text-gray-700 list-none">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start text-sm sm:text-base">
                      <span className="mr-2 text-blue-500">•</span>
                      {resp}
                    </li>
                  ))}
                </ul>
              )}
              <button
                onClick={() => toggleExpand(index)}
                className="mt-2 text-blue-600 hover:text-blue-800 text-sm sm:text-base font-medium flex items-center"
              >
                {expanded[index] ? 'See Less' : 'See More'}
                <span className="ml-1">{expanded[index] ? '↑' : '↓'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Experience;