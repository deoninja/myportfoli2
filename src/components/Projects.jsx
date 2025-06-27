import React from 'react';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';


function Projects() {
  const projects = [
    {
      title: 'Interactive Learning',
      tech: 'React.js, Node.js, Express, MongoDB, Tailwind CSS',
      description: 'A full-stack interactive learning platform designed to enhance user engagement through dynamic content and real-time feedback. Features include user authentication, progress tracking, and a rich text editor for content creation. Built with React.js for a responsive frontend, Node.js/Express for a robust backend API, and MongoDB for flexible data storage. Styled with Tailwind CSS for a modern and clean UI.',
      tags: ['React.js', 'Tailwind CSS'],
      status: 'Live',
      liveDemo: 'https://productivity-hub-five.vercel.app/',
      sourceCode: 'https://github.com/deoninja/productivity-hub',
    },
    {
      title: 'Room Booking',
      tech: 'NextJS, Appwrite, Tailwind',
      description: 'Designed and implemented a dynamic room booking system featuring detailed descriptions, equipped with smart scheduling via a Next.js-powered interface, secure data management through Appwrite, and a sleek, responsive design styled with Tailwind CSS. Offers real-time availability updates and a user-friendly experience. Leverages modern web technologies to enhance functionality and streamline resource allocation.',
      tags: ['NextJS', 'Appwrite', 'Tailwind'],
      tagColors: ['bg-blue-100 text-blue-800', 'bg-green-100 text-green-800', 'bg-yellow-100 text-yellow-800', 'bg-purple-100 text-purple-800'],
      status: 'Live',
      liveDemo: 'https://room-booking-sdth.vercel.app',
      sourceCode: 'https://github.com/deoninja/Room-booking',
    },
    {
      title: 'Real-time Chat Application',
      tech: 'React.js, Zustand, Tailwind Socket.io, MongoDB, NodeJs',
      description: 'Feature-rich chat platform with real-time messaging, typing indicators, and read receipts. Implemented with WebSockets for instant communication',
      tags: ['React.js', 'Zustand', 'Socket.io', 'Tailwind', 'MongoDB', 'NodeJs'],
      tagColors: ['bg-green-100 text-green-800', 'bg-red-100 text-red-800', 'bg-blue-100 text-blue-800', 'bg-purple-100 text-purple-800', 'bg-green-200 text-green-900', 'bg-green-100 text-green-500'],
      status: 'Live',
      liveDemo: 'https://mern-chat-app-0ogh.onrender.com',
      sourceCode: 'https://github.com/deoninja/mern-chat-app',
    },
    {
      title: 'Snake Game',
      tech: 'React.js, Tailwind, Vercel',
      description: 'This is a modern, web-based implementation of the classic Snake game, built using React and deployed on Vercel. The game combines nostalgic gameplay with a sleek, customizable user interface, featuring dark/light mode toggling, sound effects, and responsive controls for both desktop and mobile devices. Players control a snake that grows longer as it consumes food, aiming to achieve the highest score possible without colliding with the walls or itself.',
      tags: ['React.js','Tailwind', 'Vercel'],
      tagColors: ['bg-green-100 text-green-800', 'bg-red-100 text-red-800', 'bg-purple-100 text-purple-800'],
      status: 'Live',
      liveDemo: 'https://snakegame-nine-omega.vercel.app',
      sourceCode: 'https://github.com/deoninja/snakegame',
    },
  ];

  return (
    <section className="bg-[#ffffff] p-4 sm:p-6 rounded-xl shadow-md hover:shadow-xl transition-all">
      <h2 className="text-xl sm:text-2xl font-bold text-blue-700 border-b pb-2 mb-3 sm:mb-4 flex items-center">
        <FaExternalLinkAlt className="mr-2 sm:mr-3 text-blue-500" />
        Featured Projects
      </h2>
      <div className="space-y-4 sm:space-y-6 bg-[#ffffff]">
        {projects.map((project, index) => (
          <div key={index} className="project-card p-4 sm:p-5 rounded-lg border border-gray-100 bg-[#ffffff]" style={{backgroundColor:'#ffffff'}}>
            <div className="flex flex-col sm:flex-row justify-between items-start bg-[#ffffff]" >
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-blue-800">{project.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 mt-1">{project.tech}</p>
              </div>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-2 sm:mt-0">{project.status}</span>
            </div>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-700">{project.description}</p>
            <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <span key={idx} className={`${project.tagColors[idx]} text-xs px-2 py-1 rounded`}>{tag}</span>
              ))}
            </div>
            <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <a href={project.liveDemo} target="_blank" className="text-blue-600 hover:text-blue-800 flex items-center text-sm sm:text-base">
                <FaExternalLinkAlt className="mr-1" /> Live Demo
              </a>
              <a href={project.sourceCode} target="_blank" className="text-gray-600 hover:text-gray-800 flex items-center text-sm sm:text-base">
                <FaGithub className="mr-1" /> Source Code
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;