import { useState } from 'react';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import { useTiltEffect, useMagneticEffect } from '../../hooks/useMouseParallax';

function ContactSection() {
  const [titleRef, titleVisible] = useScrollAnimation(0.1);
  const [formRef, formVisible] = useScrollAnimation(0.1);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert('Please fill in all fields.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    try {
      // Create mailto link with form data
      const subject = encodeURIComponent(`Portfolio Contact: Message from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Message:\n${formData.message}\n\n` +
        `---\nSent from your portfolio contact form`
      );
      
      const mailtoLink = `mailto:deotri4@gmail.com?subject=${subject}&body=${body}`;
      
      // Open default email client
      window.location.href = mailtoLink;
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        message: '',
      });
      
      // Show success message
      alert('Thank you for your message! Your default email client should open with the message ready to send.');
      
    } catch (error) {
      console.error('Error sending message:', error);
      alert('There was an error processing your message. Please try again or contact me directly at deotri4@gmail.com');
    }
  };

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-12">
      <div 
        ref={titleRef}
        className="text-center mb-12 opacity-100 translate-y-0"
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
        className="max-w-lg mx-auto rounded-xl p-8 shadow-lg bg-white dark:bg-gray-800/50 opacity-100 translate-y-0 scale-100"
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
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400 transition-colors px-3 py-2"
              placeholder="Your full name"
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
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400 transition-colors px-3 py-2"
              placeholder="your.email@example.com"
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
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400 transition-colors resize-vertical px-3 py-2"
              placeholder="Tell me about your project, ideas, or just say hello..."
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
        className="mt-12 text-center text-gray-600 dark:text-gray-300 opacity-100 translate-y-0"
      >
        <p>Or connect with me directly:</p>
        <div className="flex justify-center items-center space-x-4 mt-4 flex-wrap">
          <a href="mailto:deotri4@gmail.com" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            <i className="fas fa-envelope mr-2"></i>
            deotri4@gmail.com
          </a>
          <span className="hidden sm:inline">|</span>
          <p className="flex items-center">
            <i className="fas fa-phone mr-2"></i>
            +639912276904
          </p>
        </div>
        
        {/* Social Media Links */}
        <div className="mt-8 opacity-100 translate-y-0">
          <p className="text-center mb-4 text-gray-600 dark:text-gray-400">Follow me on social media:</p>
          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/deoninja"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-900 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-110"
              aria-label="GitHub Profile"
            >
              <i className="fab fa-github text-xl text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/deonin/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-blue-600 transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn Profile"
            >
              <i className="fab fa-linkedin text-xl text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors"></i>
            </a>
            <a
              href="https://x.com/deonin"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-black dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110"
              aria-label="X (Twitter) Profile"
            >
              <i className="fab fa-twitter text-xl text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors"></i>
            </a>
            <a
              href="https://www.facebook.com/deo.trinidad"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-blue-500 transition-all duration-300 hover:scale-110"
              aria-label="Facebook Profile"
            >
              <i className="fab fa-facebook text-xl text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
