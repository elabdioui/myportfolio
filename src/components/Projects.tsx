import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with React and Node.js",
    longDescription: "Built a complete e-commerce platform with features including user authentication, product management, shopping cart, and payment integration using Stripe.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=400&fit=crop",
    github: "https://github.com",
    demo: "https://demo.com",
    tags: ["React", "Node.js", "MongoDB", "Stripe"]
  },
  {
    title: "Weather Dashboard",
    description: "Real-time weather tracking with OpenWeather API",
    longDescription: "Developed a weather dashboard that provides real-time weather information, forecasts, and interactive maps using the OpenWeather API and Mapbox.",
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=600&h=400&fit=crop",
    github: "https://github.com",
    demo: "https://demo.com",
    tags: ["React", "API", "TypeScript"]
  },
  {
    title: "Task Management App",
    description: "A collaborative task manager built with React and Firebase",
    longDescription: "Created a real-time task management application with features like team collaboration, task assignment, and progress tracking using Firebase.",
    image: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=600&h=400&fit=crop",
    github: "https://github.com",
    demo: "https://demo.com",
    tags: ["React", "Firebase", "Redux"]
  }
];

export function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState("All");

  const allTags = ["All", ...new Set(projects.flatMap(p => p.tags))];

  const filteredProjects = projects.filter(project => 
    filter === "All" || project.tags.includes(filter)
  );

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-blue-900 via-black to-purple-900">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-12 text-center text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Projects
            </span>
          </h2>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {allTags.map((tag, index) => (
              <motion.button
                key={tag}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === tag
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => setFilter(tag)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {tag}
              </motion.button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className="bg-black bg-opacity-50 rounded-xl overflow-hidden cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="relative group">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-4">
                        <motion.a
                          href={project.github}
                          className="p-2 bg-white rounded-full hover:bg-gray-200 transition-colors"
                          whileHover={{ scale: 1.1, rotate: 360 }}
                          onClick={e => e.stopPropagation()}
                        >
                          <Github className="w-6 h-6 text-black" />
                        </motion.a>
                        <motion.a
                          href={project.demo}
                          className="p-2 bg-white rounded-full hover:bg-gray-200 transition-colors"
                          whileHover={{ scale: 1.1, rotate: 360 }}
                          onClick={e => e.stopPropagation()}
                        >
                          <ExternalLink className="w-6 h-6 text-black" />
                        </motion.a>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 text-xs font-medium bg-gray-800 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {selectedProject && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50"
                onClick={() => setSelectedProject(null)}
              >
                <motion.div
                  initial={{ scale: 0.8, y: 50 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.8, y: 50 }}
                  className="bg-gray-900 rounded-xl p-6 max-w-2xl w-full relative"
                  onClick={e => e.stopPropagation()}
                >
                  <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                    onClick={() => setSelectedProject(null)}
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-64 object-cover rounded-lg mb-6"
                  />
                  <h3 className="text-2xl font-bold text-white mb-4">{selectedProject.title}</h3>
                  <p className="text-gray-300 mb-6">{selectedProject.longDescription}</p>
                  <div className="flex gap-4">
                    <motion.a
                      href={selectedProject.github}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="w-5 h-5" />
                      View Code
                    </motion.a>
                    <motion.a
                      href={selectedProject.demo}
                      className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="w-5 h-5" />
                      Live Demo
                    </motion.a>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}