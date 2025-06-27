import React, { useState, useEffect, useRef } from 'react';
import { FaTimes, FaCommentDots, FaPaperPlane } from 'react-icons/fa';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const chatRef = useRef(null);

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY; // Access API key from .env

  const suggestedQuestions = [
    "What's your professional experience?",
    "What technologies are you proficient in?",
    "Can you tell me about your education?",
    "What projects have you worked on recently?",
  ];

  const resumeData = `
    Deoniño Trinidad
    Lower Sakura, Mahabang parang, Angono Rizal PH
    +639912276904
    deoagent@gmail.com
    Lnkedin: https://www.linkedin.com/in/deonin
    Github: https://github.com/deoninja
    Portfolio: https://portfolios-six-iota.vercel.app
    PROFESSIONAL SUMMARY
    Passionate Full Stack Web Developer with 5+ years of experience crafting modern, responsive web applications. Specialized in JavaScript ecosystems including React.js and Vue.js for frontend, and Node.js with Laravel for backend development. Proven track record of delivering high-performance solutions with clean, maintainable code. Strong advocate for best practices, performance optimization, and intuitive UX design.
    SKILLS
    ● Languages: JavaScript, typeScript, HTML5, CSS3, PHP
    ● Frameworks/Libraries: React.js, Vue.js, NodeJS, Laravel, Bootstrap, Tailwind CSS, WordPress
    ● Tools: Git, Bitbucket, Docker, Node.js, RESTful API Integration
    ● AI: Google AI Studio
    ● Other: Deployment, Debugging, Troubleshooting, Version Control
    EXPERIENCE
    8box Solutions, Quezon City — Frontend Engineer
    SEPTEMBER 2024 - PRESENT
    ● Led development of 10+ web applications using React.
    ● Improved application performance by 40% through code optimization.
    ● Mentored junior developers and conducted code reviews.
    LBTEK Systems, Caloocan — React.Js / Vue.Js
    JANUARY 2021 - SEPTEMBER 2024
    ● Developed and maintained admin panel interfaces using React.js and Vue.js.
    ● Integrated REST APIs into the front-end for seamless data flow.
    ● Deployed web applications to production environments, ensuring smooth transitions from development to live operations.
    ● Maintained and debugged web-based applications, resolving issues quickly to minimize downtime.
    ● Used version control tools like Git and Bitbucket to manage and track code changes.
    Hivelabs, Malabon — Wordpress/Laravel Developer
    AUGUST 2020 - JANUARY 2021
    ● Designed and developed custom WordPress themes and Laravel-based web applications.
    ● Delivered fully functional web solutions with short turnaround times.
    ● Assisted in the maintenance and troubleshooting of existing web applications.
    ● Collaborated using version control systems to manage source code efficiently.
    Premiere Computer Learning Center, Parañaque — Computer Instructor
    JUNE 2019 - AUGUST 2020
    ● Taught fundamental and advanced computer skills, including introductory programming.
    ● Created lesson plans and ensured the efficient operation of the computer laboratory.
    ● Provided technical support and maintenance for software and hardware setups.
    EDUCATION
    Informatics College, NorthGate Alabang — BS Information Technology
    JUNE 2015 - MAY 2018
    Alabang Muntinlupa City
    CERTIFICATIONS
    ● Advanced Level of Software Engineering — Coursebank (June 2024)
    https://coursebank.ph/certificates/c67b1fffe49a424a8bbacfc8b5f53655
    ● Intermediate Level of Software Engineering — Coursebank (June 2024)
    https://coursebank.ph/certificates/84be6b0f6c8d49c89841551b9e748286
    ● Legacy JavaScript Algorithms and Data Structures — freeCodeCamp (June 2024)
    https://freecodecamp.org/certification/fcc737bf2f1-292a-456e-9f4f-9b0ca0b67a05/javascript-algorithms-and-data-structures
    ● Responsive Web Design — freeCodeCamp (April 2019)
    https://www.freecodecamp.org/certification/fcc737bf2f1-292a-456e-9f4f-9b0ca0b67a05/responsive-web-design
  `;

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);
    setShowSuggestions(false);
    setInput('');

    try {
      const generationConfig = {
        temperature: 0.7,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 65536,
        responseMimeType: 'text/plain',
      };

      const data = {
        generationConfig,
        contents: [
          {
            role: 'user',
            parts: [{ text: 'When do you graduated in college?' }],
          },
          {
            role: 'model',
            parts: [
              { text: 'The user is asking about the graduation date from college based on the provided resume. I need to look at the EDUCATION section and extract the graduation month and year.\n\nFrom the EDUCATION section:\nInformatics College, NorthGate Alabang — BS Information Technology\nJUNE 2015 - MAY 2018\n\nThe graduation date is May 2018.' },
              { text: 'Based on the resume, Deoniño Trinidad graduated college in **May 2018**.' },
            ],
          },
          {
            role: 'user',
            parts: [{ text: 'what school?' }],
          },
          {
            role: 'model',
            parts: [
              { text: 'The user is asking about the school Deoniño Trinidad graduated from. I need to look at the EDUCATION section of the resume to find this information. The resume states "Informatics College, NorthGate Alabang" under the EDUCATION section.' },
              { text: 'Based on the resume, Deoniño Trinidad graduated from **Informatics College, NorthGate Alabang**.' },
            ],
          },
          {
            role: 'user',
            parts: [{ text: input }],
          },
        ],
        systemInstruction: {
          role: 'user',
          parts: [{ text: `You are in charge to answer every question based on the following resume:\n\n${resumeData}` }],
        },
      };

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-thinking-exp-01-21:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const result = await response.json();
      const botResponseText = result.candidates[0].content.parts[0].text;
      setMessages((prev) => [...prev, { text: botResponseText, sender: 'bot' }]);
    } catch (error) {
      console.error('Error fetching Gemini API:', error);
      setMessages((prev) => [
        ...prev,
        { text: 'Sorry, something went wrong. Please try again.', sender: 'bot' },
      ]);
    }
  };

  const handleSuggestionClick = async (question) => {
    const userMessage = { text: question, sender: 'user' };
    setMessages([...messages, userMessage]);
    setShowSuggestions(false);

    try {
      const generationConfig = {
        temperature: 0.7,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 65536,
        responseMimeType: 'text/plain',
      };

      const data = {
        generationConfig,
        contents: [
          {
            role: 'user',
            parts: [{ text: 'When do you graduated in college?' }],
          },
          {
            role: 'model',
            parts: [
              { text: 'The user is asking about the graduation date from college based on the provided resume. I need to look at the EDUCATION section and extract the graduation month and year.\n\nFrom the EDUCATION section:\nInformatics College, NorthGate Alabang — BS Information Technology\nJUNE 2015 - MAY 2018\n\nThe graduation date is May 2018.' },
              { text: 'Based on the resume, Deoniño Trinidad graduated college in **May 2018**.' },
            ],
          },
          {
            role: 'user',
            parts: [{ text: 'what school?' }],
          },
          {
            role: 'model',
            parts: [
              { text: 'The user is asking about the school Deoniño Trinidad graduated from. I need to look at the EDUCATION section of the resume to find this information. The resume states "Informatics College, NorthGate Alabang" under the EDUCATION section.' },
              { text: 'Based on the resume, Deoniño Trinidad graduated from **Informatics College, NorthGate Alabang**.' },
            ],
          },
          {
            role: 'user',
            parts: [{ text: question }],
          },
        ],
        systemInstruction: {
          role: 'user',
          parts: [{ text: `You are in charge to answer every question based on the following resume:\n\n${resumeData}` }],
        },
      };

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-thinking-exp-01-21:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const result = await response.json();
      const botResponseText = result.candidates[0].content.parts[0].text;
      setMessages((prev) => [...prev, { text: botResponseText, sender: 'bot' }]);
    } catch (error) {
      console.error('Error fetching Gemini API:', error);
      setMessages((prev) => [
        ...prev,
        { text: 'Sorry, something went wrong. Please try again.', sender: 'bot' },
      ]);
    }
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
      <div className={`${isOpen ? 'block' : 'hidden'} w-full sm:w-80 bg-white rounded-xl shadow-xl overflow-hidden max-w-[90vw]`}>
        <div className="bg-blue-600 text-white p-3 sm:p-4 flex justify-between items-center">
          <h3 className="font-bold text-sm sm:text-base">Resume AI Assistant</h3>
          <button onClick={() => setIsOpen(false)} className="text-white hover:text-blue-200">
            <FaTimes />
          </button>
        </div>
        <div ref={chatRef} className="h-48 sm:h-64 p-3 sm:p-4 overflow-y-auto bg-gray-50 space-y-2 sm:space-y-3">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 text-xs sm:text-sm py-4">
              Ask me about my experience, skills, or projects!
            </div>
          )}
          {messages.map((msg, index) => (
            <div key={index} className="chatbot-message">
              <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'} rounded-lg px-2 sm:px-3 py-1 sm:py-2 max-w-[80%] text-xs sm:text-sm`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          {showSuggestions && (
            <div className="space-y-1 sm:space-y-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(question)}
                  className="w-full text-left p-1 sm:p-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded text-xs sm:text-sm transition"
                >
                  {question}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="p-2 sm:p-3 border-t bg-gray-100">
          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type your question..."
              className="flex-1 border rounded-l-lg px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button onClick={sendMessage} className="bg-blue-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-r-lg hover:bg-blue-600 transition">
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="floating-btn bg-blue-500 text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition"
      >
        <FaCommentDots className="text-lg sm:text-xl" />
      </button>
    </div>
  );
}

export default Chatbot;