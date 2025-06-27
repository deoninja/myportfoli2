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
        Passionate Full Stack Web Developer with 5+ years of experience crafting modern, responsive web applications. 
        Specialized in JavaScript ecosystems including React.js and Vue.js for frontend, and Node.js with Laravel for backend development. 
        Proven track record of delivering high-performance solutions with clean, maintainable code. 
        Strong advocate for best practices, performance optimization, and intuitive UX design.
      </p>
    </section>
  );
}

export default ProfessionalSummary;