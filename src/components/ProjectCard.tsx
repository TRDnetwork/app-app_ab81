import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  description: string;
}

const ProjectCard = ({ title, description }: ProjectCardProps) => (
  <motion.div
    className="bg-surface p-6 rounded-lg shadow-sm hover-lift"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5 }}
    style={{ minHeight: '180px' }}
  >
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-dim">{description}</p>
  </motion.div>
);

export default ProjectCard;