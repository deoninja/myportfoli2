import React from 'react';
import { FaGraduationCap } from 'react-icons/fa';

function Education() {
  return (
    <section className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-xl transition-all">
      <h2 className="text-xl sm:text-2xl font-bold text-blue-700 border-b pb-2 mb-3 sm:mb-4 flex items-center">
        <FaGraduationCap className="mr-2 sm:mr-3 text-blue-500" />
        Education
      </h2>
      <div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-800">BS in Information Technology</h3>
        <p className="text-sm sm:text-base text-gray-600">Informatics College • 2015 - 2019</p>
        <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-700">Focused my specialization on Web Development and Database Systems, which allowed me to build a strong foundation in creating and managing web-based applications and data-driven solutions.</p>
      </div>
    </section>
  );
}

export default Education;