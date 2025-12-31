import image from '../../assets/mypicture.jpg';
import useScrollAnimation from '../../hooks/useScrollAnimation';

function HomeSection() {
  const [ref, isVisible] = useScrollAnimation(0.2);
  return (
    <section
      ref={ref}
      id="home"
      className="next-section section-transition pt-24 pb-16 md:pt-32 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
        <div className="order-2 md:order-1">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-gray-800 dark:text-white">
            Hi, I'm <span className="gradient-text">Deo</span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-600 mb-6 dark:text-gray-400">Frontend Developer</h2>
          <p className="text-gray-600 mb-8 max-w-lg dark:text-gray-400">
            I build exceptional digital experiences that are fast, accessible, and visually appealing. Currently focused on creating innovative web solutions.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="#contact"
              className="px-6 py-3 rounded-md gradient-bg text-white font-medium hover:shadow-lg transition-all text-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Contact Me
            </a>
            <a
              href="#projects"
              className="px-6 py-3 rounded-md border-2 border-primary text-primary font-medium hover:bg-primary hover:text-white transition-all text-center focus:outline-none focus:ring-2 focus:ring-primary dark:border-primary dark:text-primary dark:hover:bg-primary dark:hover:text-white"
            >
              View Work
            </a>
          </div>
          <div className="mt-8 flex space-x-6">
            {[
              { platform: 'github', url: 'https://github.com/deoninja' },
              { platform: 'linkedin', url: 'https://www.linkedin.com/in/deonin/' },
              { platform: 'twitter', url: 'https://x.com/deonin' },
              { platform: 'facebook', url: 'https://www.facebook.com/deo.trinidad' },
            ].map(({ platform, url }) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                aria-label={`${platform} Profile`}
              >
                <i className={`fab fa-${platform} text-2xl`}></i>
              </a>
            ))}
          </div>
        </div>
        <div className="order-1 md:order-2 flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
            <div className="absolute inset-0 rounded-full opacity-30" style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))', filter: 'blur(40px)' }}></div>
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary shadow-xl floating">
              <img
                src={image}
                alt="Deo, Full Stack Developer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeSection;
