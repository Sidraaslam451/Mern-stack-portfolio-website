import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const filters = ["All", "fullstack", "frontend", "backend"];

// Fallback data — jab tak API se data na aaye
const demoProjects = [
  {
    _id: "1",
    title: "E-Commerce Platform",
    description:
      "Full stack MERN e-commerce app with cart, payments, and admin dashboard.",
    techStack: ["React", "Node.js", "MongoDB", "Express"],
    category: "fullstack",
    liveUrl: "https://demo.com",
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    _id: "2",
    title: "Portfolio Website",
    description:
      "Animated portfolio with MERN stack, admin panel, and blog system.",
    techStack: ["React", "Framer Motion", "TailwindCSS"],
    category: "frontend",
    liveUrl: "https://demo.com",
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    _id: "3",
    title: "REST API Backend",
    description: "Scalable REST API with JWT auth, rate limiting, and MongoDB.",
    techStack: ["Node.js", "Express", "MongoDB", "JWT"],
    category: "backend",
    liveUrl: "",
    githubUrl: "https://github.com",
    featured: false,
  },
];

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="bg-gray-800/50 border border-gray-700 hover:border-blue-500/50 rounded-2xl overflow-hidden group transition-colors duration-300"
    >
      {/* Project Image / Placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-blue-900/50 to-purple-900/50 overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">🚀</div>
              <div className="text-gray-400 text-sm">{project.category}</div>
            </div>
          </div>
        )}

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-lg">
            Featured
          </div>
        )}

        {/* Hover overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gray-950/80 flex items-center justify-center gap-4"
        >
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-gray-700 text-white text-sm font-medium rounded-lg hover:bg-gray-600 transition-colors"
            >
              GitHub
            </a>
          )}
        </motion.div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <h3 className="text-white font-bold text-lg mb-2 group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-gray-700/50 text-blue-400 text-xs rounded-md border border-gray-600"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState(demoProjects);
  const [activeFilter, setActiveFilter] = useState("All");
  //   const [loading, setLoading] = useState(false);

  // API se projects fetch karo
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/projects`,
        );
        if (res.data && res.data.data && res.data.data.length > 0) {
          setProjects(res.data.data);
        }
      } catch (error) {
        // API fail hone pe demo data use karo
        console.log("Demo data use ho raha hai", error);
      } finally {
        // setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Filter karo
  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-blue-400 text-sm font-medium tracking-widest uppercase mb-3">
            My Work
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Projects
            </span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 capitalize ${
                activeFilter === filter
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                  : "bg-gray-800 text-gray-400 hover:text-white border border-gray-700 hover:border-blue-500/50"
              }`}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filtered.map((project, index) => (
              <ProjectCard key={project._id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-4">Want to see more of my work?</p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/yourusername"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-blue-500/50 text-white font-medium rounded-xl transition-all"
          >
            View All on GitHub →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
