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
        <h4 className="text-sm sm:text-base font-medium text-gray-700">Informatics College – NorthGate Alabang</h4>
        <p className="text-xs sm:text-sm text-gray-600">Alabang, Muntinlupa City | June 2015 – May 2018</p>
      </div>
    </section>
  );
}

export default Education;