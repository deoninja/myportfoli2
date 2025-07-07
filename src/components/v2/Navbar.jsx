import { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';


const NavLink = ({ href, children }) => {
  
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector(href);
      if (section) {
        const top = section.offsetTop - 100;
        const height = section.clientHeight;
        const scrollY = window.scrollY;
        setIsActive(scrollY >= top && scrollY < top + height);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [href]);

  const handleClick = (e) => {
    e.preventDefault();
    const section = document.querySelector(href);
    if (section) {
      const top = section.offsetTop - 80; // Adjust for fixed navbar height
      window.scrollTo({
        top,
        behavior: 'smooth',
      });
    }
  };



  return (
    <a
      href={href}
      onClick={handleClick}
      className={`text-gray-700 hover:text-primary font-medium dark:text-gray-300 dark:hover:text-primary ${isActive ? 'text-primary dark:text-primary' : ''}`}
    >
      {children}
    </a>
  );
};

function Navbar() {
  const navigate =  useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const handleLinkClick = () => {
    navigate('/resume')
  }

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleMobileLinkClick = (e, href) => {
    e.preventDefault();
    const section = document.querySelector(href);
    if (section) {
      const top = section.offsetTop - 80; // Adjust for fixed navbar height
      window.scrollTo({
        top,
        behavior: 'smooth',
      });
    }
    toggleMobileMenu();
  };

  return (
    <nav className="fixed w-full backdrop-blur-md shadow-sm z-50" style={{ backgroundColor: 'var(--nav-background)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-xl font-bold gradient-text">DT</span>
          </div>
          <div className="hidden md:flex ml-10 items-center space-x-8">
            <NavLink href="#home">Home</NavLink>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#contact">Contact</NavLink>
            <button
              id="theme-toggle"
              type="button"
              className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white focus:outline-none ml-4 cursor-pointer"
              aria-label="Toggle dark mode"
              onClick={toggleTheme}
            >
               {isDarkMode ? (
                <i id="theme-toggle-dark-icon-mobile fas fa-moon text-xl cursor-pointer" className="fas fa-moon text-xl"></i>
              ) : (
                <i id="theme-toggle-light-icon-mobile fas fa-sun text-xl cursor-pointer" className="fas fa-sun text-xl"></i>
              )}
            </button>
            <a
              onClick={handleLinkClick}
              className="px-4 py-2 rounded-md gradient-bg text-white font-medium hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary hover:cursor-pointer"
            >
              Resume
            </a>
          </div>
          <div className="md:hidden flex items-center">
            <button
              id="theme-toggle-mobile"
              type="button"
              className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white focus:outline-none mr-4 cursor-pointer"
              aria-label="Toggle dark mode"
              onClick={toggleTheme}
            >
                 {isDarkMode ? (
                <i id="theme-toggle-dark-icon-mobile fas fa-moon text-xl cursor-pointer" className="fas fa-moon text-xl"></i>
              ) : (
                <i id="theme-toggle-light-icon-mobile fas fa-sun text-xl cursor-pointer" className="fas fa-sun text-xl"></i>
              )}
            </button>
            <button
              id="menu-toggle"
              className="text-gray-700 hover:text-gray-900 focus:outline-none dark:text-gray-300 dark:hover:text-white"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>
      <div
        id="mobile-menu"
        className={`md:hidden shadow-lg bg-white dark:bg-darkBackground ${isMobileMenuOpen ? '' : 'hidden'}`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {['home', 'about', 'projects', 'contact'].map((section) => (
            <a
              key={section}
              href={`#${section}`}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 dark:text-darkText dark:hover:text-primary dark:hover:bg-gray-700"
              onClick={(e) => handleMobileLinkClick(e, `#${section}`)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          ))}
          <a
            onClick={handleLinkClick}
            className="block px-3 py-2 rounded-md text-base font-medium gradient-text"
          >
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;