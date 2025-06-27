import React from 'react';
import { FaAward } from 'react-icons/fa';

function Certifications() {
  const certifications = [
    { title: 'Advanced Level of Software Engineering', issuer: 'Coursebank ', year: '2024' },
    { title: 'JavaScript Algorithms and Data Structures', issuer: 'freeCodeCamp ', year: '2024' },
    { title: 'Responsive Web Design', issuer: 'freeCodeCamp', year: '2019' },
  ];

  return (
    <section className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-xl transition-all">
      <h2 className="text-xl sm:text-2xl font-bold text-blue-700 border-b pb-2 mb-3 sm:mb-4 flex items-center">
        <FaAward className="mr-2 sm:mr-3 text-blue-500" />
        Certifications
      </h2>
      <div className="space-y-3 sm:space-y-4">
        {certifications.map((cert, index) => (
          <div key={index} className="flex items-start">
            <div className="bg-blue-100 p-1 sm:p-2 rounded-lg mr-2 sm:mr-3">
              <FaAward className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-sm sm:text-base text-gray-800">{cert.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600">{cert.issuer} • {cert.year}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Certifications;