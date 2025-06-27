import React, { useState } from 'react';
import { FaBriefcase } from 'react-icons/fa';

function Experience() {
  const [expanded, setExpanded] = useState({});

  const experiences = [
    {
      title: 'Senior Frontend Engineer',
      company: '8Box Solutions, Quezon City',
      duration: 'September 2024 - Present',
      responsibilities: [
        'Led development of 10+ web applications using React',
        'Improved application performance by 40% through code optimization',
        'Mentored junior developers and conducted code reviews',
        'MERN MOngoDB,Express, React, Node',
        'JAVA J2ee',
      ],
    },
    {
      title: 'React.js / Vue.js Developer',
      company: 'LBTEK Systems, Caloocan',
      duration: 'January 2021 - September 2024',
      responsibilities: [
        'Developed and maintained admin panel interfaces using React.js and Vue.js.',
        'Integrated REST APIs into the front-end for seamless data flow.',
        'Deployed web applications to production environments, ensuring smooth transitions from development to live operations.',
        'Maintained and debugged web-based applications, resolving issues quickly to minimize downtime.',
        'Used version control tools like Git and Bitbucket to manage and track code changes.',
      ],
    },
    {
      title: 'WordPress/Laravel Developer',
      company: 'Hivelabs, Malabon',
      duration: 'August 2020 - January 2021',
      responsibilities: [
        'Designed and developed custom WordPress themes and Laravel-based web applications.',
        'Delivered fully functional web solutions with short turnaround times.',
        'Assisted in the maintenance and troubleshooting of existing web applications.',
        'Collaborated using version control systems to manage source code efficiently.',
      ],
    },
    {
      title: 'Computer Instructor',
      company: 'Premiere Computer Learning Center, Parañaque',
      duration: 'June 2019 - August 2020',
      responsibilities: [
        'Taught fundamental and advanced computer skills, including introductory programming.',
        'Created lesson plans and ensured the efficient operation of the computer laboratory.',
        'Provided technical support and maintenance for software and hardware setups.',
      ],
    },
  ];

  const toggleExpand = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
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