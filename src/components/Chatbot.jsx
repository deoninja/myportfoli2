import React, { useState, useEffect, useRef } from 'react';
import { FaTimes, FaCommentDots, FaPaperPlane } from 'react-icons/fa';
import { resumeData } from '../assets/resumeData';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const chatRef = useRef(null);

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  const suggestedQuestions = [
    "What's your professional experience?",
    "What technologies are you proficient in?",
    "Can you tell me about your education?",
    "What projects have you worked on recently?",
  ];

  const sendMessage = async (message) => {
    if (message.trim() === '') return;

    const userMessage = { text: message, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setShowSuggestions(false);
    setInput('');

    if (!apiKey) {
      setMessages((prev) => [
        ...prev,
        { text: 'Please add your API key to the .env file.', sender: 'bot' },
      ]);
      return;
    }

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
            parts: [{ text: message }],
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
      <div className={`${isOpen ? 'block' : 'hidden'} w-full sm:w-80 bg-white dark:bg-darkBackground rounded-xl shadow-xl overflow-hidden max-w-[90vw]`}>
        <div className="bg-blue-600 text-white p-3 sm:p-4 flex justify-between items-center">
          <h3 className="font-bold text-sm sm:text-base">Resume AI Assistant</h3>
          <button onClick={() => setIsOpen(false)} className="text-white hover:text-blue-200">
            <FaTimes />
          </button>
        </div>
        <div ref={chatRef} className="h-48 sm:h-64 p-3 sm:p-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 space-y-2 sm:space-y-3">
          <>
            {messages.length === 0 && (
              <div className="text-center text-gray-500 dark:text-gray-400 text-xs sm:text-sm py-4">
                Ask me about my experience, skills, or projects!
              </div>
            )}
            {messages.map((msg, index) => (
              <div key={index} className="chatbot-message">
                <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 dark:bg-gray-300 dark:text-darkText'} rounded-lg px-2 sm:px-3 py-1 sm:py-2 max-w-[80%] text-xs sm:text-sm`}>
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
                    onClick={() => sendMessage(question)}
                    className="w-full text-left p-1 sm:p-2 bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-blue-300 rounded text-xs sm:text-sm transition"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
          </>
        </div>
        <div className="p-2 sm:p-3 border-t bg-gray-100 dark:bg-gray-900 dark:border-gray-700">
          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage(input)}
              placeholder="Type your question..."
              className="flex-1 border rounded-l-lg px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
            <button onClick={() => sendMessage(input)} className="bg-blue-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-r-lg hover:bg-blue-600 transition">
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