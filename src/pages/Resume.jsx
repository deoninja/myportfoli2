
import Header from '../components/Header';
import ProfessionalSummary from '../components/ProfessionalSummary';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Certifications from '../components/Certifications';
const Resume = () => {
    return (
        <div className="min-h-screen">
          <Header />
          <main className="max-w-6xl mx-auto py-4 px-4 sm:py-8 sm:px-6 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
            <div className="space-y-4 sm:space-y-8 lg:col-span-2">
              <ProfessionalSummary />
              <Skills />
              <Projects />
            </div>
            <div className="space-y-4 sm:space-y-8">
              <Experience />
              <Education />
              <Certifications />
            </div>
          </main>
        </div>
      );
}

export default Resume
