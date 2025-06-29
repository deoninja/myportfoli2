

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-8 text-center text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-6 mb-4">
          {[
            { platform: 'github', url: '#' },
            { platform: 'linkedin', url: '#' },
            { platform: 'twitter', url: '#' },
            { platform: 'instagram', url: '#' },
          ].map(({ platform, url }) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary transition-colors dark:text-gray-300 dark:hover:text-primary"
              aria-label={`${platform} Profile`}
            >
              <i className={`fab fa-${platform} text-xl`}></i>
            </a>
          ))}
        </div>
        <p>© {currentYear} Deo Trinidad. All rights reserved.</p>
        <p className="text-sm mt-1">
          Built with <i className="fas fa-heart text-red-500"></i> and <span className="gradient-text font-semibold">React + Tailwind CSS</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;