import React, { useState, useEffect, useRef } from 'react';
import { FaTimes, FaCommentDots, FaPaperPlane } from 'react-icons/fa';
import { GoogleGenerativeAI } from "@google/generative-ai";
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
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash-lite",
        systemInstruction: `You are in charge to answer every question based on the following resume:\n\n${resumeData}`,
      });

      const chat = model.startChat({
        history: [
          {
            role: 'user',
            parts: [{ text: 'When do you graduated in college?' }],
          },
          {
            role: 'model',
            parts: [{ text: 'Based on the resume, Deoniño Trinidad graduated college in **May 2018**.' }],
          },
          {
            role: 'user',
            parts: [{ text: 'what school?' }],
          },
          {
            role: 'model',
            parts: [{ text: 'Based on the resume, Deoniño Trinidad graduated from **Informatics College, NorthGate Alabang**.' }],
          },
        ],
        generationConfig: {
          maxOutputTokens: 1000,
        },
      });

      const result = await chat.sendMessage(message);
      const response = await result.response;
      const text = response.text();

      setMessages((prev) => [...prev, { text: text, sender: 'bot' }]);
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
    <div className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-50">
      <div className={`${isOpen ? 'block' : 'hidden'} w-full sm:w-80 bg-white dark:bg-darkBackground rounded-xl shadow-xl overflow-hidden max-w-[90vw] mb-4`}>
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
        className="floating-btn bg-gradient-to-r from-blue-500 to-indigo-600 text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg flex items-center justify-center hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 hover:scale-110 backdrop-blur-md border border-white/20"
        aria-label="Open AI Assistant"
      >
        <FaCommentDots className="text-lg sm:text-xl" />
      </button>
    </div>
  );
}

export default Chatbot;