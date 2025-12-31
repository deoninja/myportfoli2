import React from 'react';
import { FaUserTie } from 'react-icons/fa';

function ProfessionalSummary() {
  return (
    <section className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-xl transition-all">
      <h2 className="text-xl sm:text-2xl font-bold text-blue-700 border-b pb-2 mb-3 sm:mb-4 flex items-center">
        <FaUserTie className="mr-2 sm:mr-3 text-blue-500" />
        Professional Summary
      </h2>
      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
        Highly proficient and performance-driven Front-End Developer with over 5 years of experience specializing in designing and implementing interactive, scalable, and responsive user interfaces. Expert in JavaScript, React.js, and Vue.js, with a strong focus on clean code, UI/UX best practices, and optimizing web applications for speed and scalability. Proven ability to integrate complex APIs, manage real-time data flows, and build dynamic features like chat windows and user dashboards, including experience with AI-related tools.
      </p>
    </section >
  );
}

export default ProfessionalSummary;