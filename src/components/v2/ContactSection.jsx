function ContactSection() {
    return (
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="w-20 h-1 gradient-bg mx-auto rounded-full"></div>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4 dark:text-gray-400">
            Have a project in mind or just want to say hi? Feel free to reach out! I'm always open to discussing new opportunities.
          </p>
        </div>
        <div className="max-w-lg mx-auto rounded-xl p-8 shadow-sm" style={{ backgroundColor: 'var(--card-background)' }}>
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-darkText">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-darkText">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-darkText">Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              ></textarea>
            </div>
            <div>
              <button
                type="button"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white gradient-bg hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-600 dark:text-gray-300">
          <p>Or connect with me directly:</p>
          <p className="mt-2"><i className="fas fa-envelope mr-2"></i> <a href="mailto:deotri4@gmail.com">deotri4@gmail.com</a></p>
          <p><i className="fas fa-phone mr-2"></i> +639912276904</p>
        </div>
      </section>
    );
  }
  
  export default ContactSection;