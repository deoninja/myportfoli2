import snake from '../../assets/snake.png';
import chat from '../../assets/chatapp.png';
import booking from '../../assets/roombooking.png';
import interactive from '../../assets/interactive.webp';
import foodapp from '../../assets/foodapp.webp';
import useScrollAnimation, { useStaggeredAnimation } from '../../hooks/useScrollAnimation';
import { useTiltEffect, useMagneticEffect } from '../../hooks/useMouseParallax';

const ProjectCard = ({
  image,
  alt,
  title,
  description,
  tags,
  liveDemo,
  codeRepo,
  isVisible,
  delay = 0
}) => {
  const [cardRef, cardTilt] = useTiltEffect(8, 0.12);
  const [demoRef, demoPosition, demoHovered] = useMagneticEffect(0.4, 80);
  const [codeRef, codePosition, codeHovered] = useMagneticEffect(0.4, 80);

  return (
  <div 
    ref={cardRef}
    className={`project-card bg-white dark:bg-gray-800/50 rounded-lg shadow-lg overflow-hidden transition-all duration-700 transform hover:scale-105 ${
      isVisible ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-12 rotate-2'
    }`} 
    style={{ 
      transitionDelay: `${delay}ms`,
      transform: `perspective(1000px) rotateX(${cardTilt.x}deg) rotateY(${cardTilt.y}deg) ${
        isVisible ? 'translateY(0)' : 'translateY(48px)'
      }`
    }}
  >
    <img src={image} alt={alt} className='w-full h-48 object-cover' />
    <div className='p-6 flex flex-col'>
      <h3 className='font-semibold text-lg mb-2 text-gray-800 dark:text-white'>
        {title}
      </h3>
      <p className='text-gray-600 text-sm mb-4 flex-grow dark:text-gray-300'>
        {description}
      </p>
      <div className='flex flex-wrap gap-2 mt-auto'>
        {tags.map((tag, index) => (
          <span
            key={index}
            className={`px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300`}
          >
            {tag}
          </span>
        ))}
      </div>
      <div className='flex space-x-4 mt-6'>
        <a
          ref={demoRef}
          href={liveDemo}
          className={`px-4 py-2 gradient-bg text-white rounded-md text-sm font-medium hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
            demoHovered ? 'shadow-xl' : ''
          }`}
          style={{
            transform: `translate(${demoPosition.x}px, ${demoPosition.y}px)`,
            transition: 'transform 0.3s ease-out, box-shadow 0.3s ease'
          }}
          aria-label={`Live demo of ${title}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          Live Demo
        </a>
        <a
          ref={codeRef}
          href={codeRepo}
          className={`px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
            codeHovered ? 'bg-gray-100 dark:bg-gray-700' : ''
          }`}
          style={{
            transform: `translate(${codePosition.x}px, ${codePosition.y}px)`,
            transition: 'transform 0.3s ease-out, background-color 0.3s ease'
          }}
          aria-label={`Code repository for ${title}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          Code
        </a>
      </div>
    </div>
  </div>
  );
};

function ProjectsSection() {
  const [titleRef, titleVisible] = useScrollAnimation(0.3);
  const [projectsRef, projectsVisible] = useStaggeredAnimation(5, 200);

  return (
    <section
      id='projects'
      className='py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto rounded-2xl my-12 bg-gray-50 dark:bg-gray-800/50'
    >
      <div 
        ref={titleRef}
        className={`text-center mb-12 transition-all duration-1000 ${
          titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className='text-3xl md:text-4xl font-bold mb-4'>
          My <span className='gradient-text'>Projects</span>
        </h2>
        <div className='w-20 h-1 gradient-bg mx-auto rounded-full'></div>
        <p className='text-gray-600 max-w-2xl mx-auto mt-4 dark:text-gray-400'>
          Here are some of my recent projects. Each one was built to solve a
          specific problem or explore new technologies.
        </p>
      </div>
      <div ref={projectsRef} className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        <ProjectCard
          image={interactive}
          alt='Screenshot of Interactive Learning Platform'
          title='Interactive Learning'
          description='An interactive learning platform designed to enhance user engagement through dynamic content and real-time feedback. Features include user authentication, progress tracking, and a rich text editor for content creation. Built with React.js for a responsive frontend and styled with Tailwind CSS for a modern and clean UI.'
          tags={['React.js', 'Tailwind CSS']}
          liveDemo='https://productivity-hub-five.vercel.app/'
          codeRepo='https://github.com/deoninja/productivity-hub'
          isVisible={projectsVisible.has(0)}
          delay={0}
        />
        <ProjectCard
          image={foodapp}
          alt='Screenshot of food-delivery-app-landing'
          title='Food Delivery App Landing Page'
          description="This project is a modern and interactive landing page for FoodieExpress, a fictional food delivery application. The design is centered around a visually appealing hero section with a dynamic phone mockup that showcases the app's user interface. The landing page is designed to be engaging and to encourage users to download the app."
          tags={['HTML5', 'CSS3', 'JavaScript (ES6+)']}
          liveDemo='https://food-delivery-app-landing.vercel.app/'
          codeRepo='https://github.com/deoninja/food-delivery-app-landing'
          isVisible={projectsVisible.has(1)}
          delay={200}
        />
        <ProjectCard
          image={booking}
          alt='Screenshot of E-commerce Platform'
          title='Room Booking'
          description='Designed and implemented a dynamic room booking system featuring detailed descriptions, equipped with smart scheduling via a Next.js-powered interface, secure data management through Appwrite, and a sleek, responsive design styled with Tailwind CSS. Offers real-time availability updates and a user-friendly experience. Leverages modern web technologies to enhance functionality and streamline resource allocation.'
          tags={['NextJS', 'Appwrite', 'Tailwind']}
          liveDemo='https://room-booking-sdth.vercel.app/'
          codeRepo='https://github.com/deoninja/Room-booking'
          isVisible={projectsVisible.has(2)}
          delay={400}
        />
        <ProjectCard
          image={chat}
          alt='Screenshot of Task Management App'
          title='Real-time Chat Application'
          description='Feature-rich chat platform with real-time messaging, typing indicators, and read receipts. Implemented with WebSockets for instant communication'
          tags={[
            'React.js',
            'Zustand',
            'Tailwind',
            'Socket.io',
            'MongoDB',
            'NodeJs',
          ]}
          liveDemo='https://mern-chat-app-0ogh.onrender.com/'
          codeRepo='https://github.com/deoninja/mern-chat-app'
          isVisible={projectsVisible.has(3)}
          delay={600}
        />
        <ProjectCard
          image={snake}
          alt='Screenshot of Blog Platform'
          title='Snake Game'
          description='This is a modern, web-based implementation of the classic Snake game, built using React and deployed on Vercel. The game combines nostalgic gameplay with a sleek, customizable user interface, featuring dark/light mode toggling, sound effects, and responsive controls for both desktop and mobile devices. Players control a snake that grows longer as it consumes food, aiming to achieve the highest score possible without colliding with the walls or itself.'
          tags={['React.js', 'Tailwind', 'Vercel']}
          liveDemo='https://snakegame-nine-omega.vercel.app/'
          codeRepo='https://github.com/deoninja/snakegame'
          isVisible={projectsVisible.has(4)}
          delay={800}
        />
      </div>
    </section>
  );
}

export default ProjectsSection;
