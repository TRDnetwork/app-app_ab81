import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './components/ProjectCard';
import ContactForm from './components/ContactForm';
import MobileContactForm from './components/MobileContactForm';

const App = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const projects = [
    { title: "Project One", description: "A responsive web app built with React and Tailwind CSS." },
    { title: "Project Two", description: "A full-stack e-commerce platform with Stripe integration." },
    { title: "Project Three", description: "A real-time dashboard using WebSocket and D3.js visualizations." },
  ];

  return (
    <div className="min-h-screen bg-bg text-text">
      {/* Hero Section */}
      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Jane Doe
          </motion.h1>
          <motion.p
            className="text-xl text-dim max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Full-Stack Developer & UI Designer
          </motion.p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-semibold mb-6">About Me</h2>
            <p className="text-dim leading-relaxed">
              I'm a passionate developer with over 5 years of experience creating digital experiences that blend clean code with thoughtful design. I specialize in React, Node.js, and modern CSS practices. When I'm not coding, you can find me hiking or experimenting with analog photography.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-semibold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Featured Projects
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} title={project.title} description={project.description} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-semibold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Get In Touch
          </motion.h2>
          {isMobile ? <MobileContactForm /> : <ContactForm />}
        </div>
      </section>
    </div>
  );
};

export default App;