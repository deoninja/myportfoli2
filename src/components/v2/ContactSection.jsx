import { useState } from 'react';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import { useTiltEffect, useMagneticEffect } from '../../hooks/useMouseParallax';

function ContactSection() {
  const [titleRef, titleVisible] = useScrollAnimation(0.3);
  const [formRef, formVisible] = useScrollAnimation(0.2);
  const [contactRef, contactVisible] = useScrollAnimation(0.1);
  const [formTiltRef, formTilt] = useTiltEffect(6, 0.15);
  const [submitRef, submitPosition, submitHovered] = useMagneticEffect(0.5, 100);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-12">
      <div 
        ref={titleRef}
        className={`text-center mb-12 transition-all duration-1000 ${
          titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Get In <span className="gradient-text">Touch</span>
        </h2>
        <div className="w-20 h-1 gradient-bg mx-auto rounded-full"></div>
        <p className="text-gray-600 max-w-2xl mx-auto mt-4 dark:text-gray-400">
          Have a project in mind or just want to say hi? Feel free to reach out! I'm always open to discussing new opportunities.
        </p>
      </div>
      <div 
        ref={formTiltRef}
        className={`max-w-lg mx-auto rounded-xl p-8 shadow-lg bg-white dark:bg-gray-800/50 transition-all duration-1000 delay-300 ${
          formVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
        }`}
        style={{
          transform: `perspective(1000px) rotateX(${formTilt.x}deg) rotateY(${formTilt.y}deg) ${
            formVisible ? 'translateY(0) scale(1)' : 'translateY(32px) scale(0.95)'
          }`
        }}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            ></textarea>
          </div>
          <div>
            <button
              ref={submitRef}
              type="submit"
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white gradient-bg hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all ${
                submitHovered ? 'shadow-xl scale-105' : ''
              }`}
              style={{
                transform: `translate(${submitPosition.x}px, ${submitPosition.y}px) ${submitHovered ? 'scale(1.05)' : 'scale(1)'}`,
                transition: 'transform 0.3s ease-out, box-shadow 0.3s ease'
              }}
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
      <div 
        ref={contactRef}
        className={`mt-12 text-center text-gray-600 dark:text-gray-300 transition-all duration-1000 delay-600 ${
          contactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <p>Or connect with me directly:</p>
        <div className="flex justify-center items-center space-x-4 mt-4">
          <a href="mailto:deotri4@gmail.com" className="hover:text-primary transition-colors">
            <i className="fas fa-envelope mr-2"></i>
            deotri4@gmail.com
          </a>
          <span>|</span>
          <p>
            <i className="fas fa-phone mr-2"></i>
            +639912276904
          </p>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
