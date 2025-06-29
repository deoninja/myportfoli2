function AboutSection() {
  return (
    <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto rounded-2xl my-12 bg-gray-50 dark:bg-gray-800/50">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="gradient-text">About Me</span>
        </h2>
        <div className="w-20 h-1 gradient-bg mx-auto rounded-full"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Who am I?</h3>
          <p className="text-gray-600 mb-6 dark:text-gray-400">
            I'm a passionate Full Stack Developer with experience in creating digital products. I specialize in JavaScript frameworks and have a strong background in both frontend and backend development.
          </p>
          <p className="text-gray-600 mb-6 dark:text-gray-300">
            My journey in web development started when I was in college, and since then I've worked with startups and established companies to build web applications that solve real-world problems.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            When I'm not coding, you can find me hiking, reading sci-fi novels, or experimenting with new technologies.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { icon: 'code', title: 'Web Development', desc: 'Building responsive and interactive web applications' },
            { icon: 'mobile-alt', title: 'Mobile Apps', desc: 'Creating cross-platform mobile experiences' },
            { icon: 'server', title: 'Backend', desc: 'Designing robust APIs and databases' },
            { icon: 'paint-brush', title: 'UI/UX', desc: 'Crafting intuitive user interfaces' },
          ].map((item, index) => (
            <div key={index} className="p-6 rounded-xl shadow-sm bg-white dark:bg-gray-900/50 transition-transform transform hover:scale-105">
              <div className="text-4xl gradient-text mb-4">
                <i className={`fas fa-${item.icon}`}></i>
              </div>
              <h4 className="font-semibold mb-2 text-gray-800 dark:text-white">{item.title}</h4>
              <p className="text-gray-600 text-sm dark:text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
