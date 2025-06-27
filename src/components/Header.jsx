import React from 'react';
import { FaEnvelope, FaPhone, FaDownload, FaLinkedin, FaGithub } from 'react-icons/fa';
import mypic from '../assets/mypicture.jpg'
import resume from '../assets/new_resume.pdf'
import {Link} from 'react-router-dom'
import { IoMdArrowBack } from "react-icons/io";


  const Header = () => {

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 px-4 sm:py-8 sm:px-6 shadow-xl">
      <Link to='/'>
        <button className='flex justify-start items-center hover:cursor-pointer hover:text-blue-100'>
          <IoMdArrowBack className='hover:cursor-pointer'/>
          <span className='hover:cursor-pointer'> Back</span>
        </button>
      </Link>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 sm:mb-6 md:mb-0">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight">Deoniño Trinidad</h1>
            <p className="mt-1 sm:mt-2 text-lg sm:text-xl md:text-2xl text-blue-100">Full Stack Web Developer</p>
            <div className="mt-2 sm:mt-3 flex flex-wrap justify-center md:justify-start gap-2 sm:gap-3">
              <a
                href="mailto:deotri4@gmail.com"
                className="flex items-center text-xs sm:text-sm bg-blue-700 bg-opacity-50 px-2 sm:px-3 py-1 rounded-full dark:bg-blue-900 dark:bg-opacity-50"
              >
                <FaEnvelope className="mr-1 sm:mr-2" /> deotri4@gmail.com
              </a>
              <a
                href="tel:+639912276904"
                className="flex items-center text-xs sm:text-sm bg-blue-700 bg-opacity-50 px-2 sm:px-3 py-1 rounded-full"
              >
                <FaPhone className="mr-1 sm:mr-2" /> +639912276904
              </a>
              <a
                href="https://www.linkedin.com/in/deonin"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-xs sm:text-sm bg-blue-700 bg-opacity-50 px-2 sm:px-3 py-1 rounded-full"
              >
                <FaLinkedin className="mr-1 sm:mr-2" /> LinkedIn
              </a>
              <a
                href="https://github.com/deoninja"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-xs sm:text-sm bg-blue-700 bg-opacity-50 px-2 sm:px-3 py-1 rounded-full"
              >
                <FaGithub className="mr-1 sm:mr-2" /> GitHub
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={mypic}
              alt="Profile"
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg mb-3 sm:mb-4"
            />
            <a
              href={resume} download="Deo Resume.pdf"
              className="bg-white text-blue-700 px-4 sm:px-6 py-1 sm:py-2 rounded-lg shadow-md hover:shadow-lg flex items-center space-x-1 sm:space-x-2 transition hover:bg-blue-50 text-sm sm:text-base dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            >
              <FaDownload /> <span>Download Resume</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;