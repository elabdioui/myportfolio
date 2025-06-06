import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, Database, Shield, Code, Zap, Cloud, Users } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { LazyImage } from './LazyImage';

export function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState("All");

  // Memoize projects data to prevent recreation
  const projects = useMemo(() => [
    {
      title: "QuantumDesk - Enterprise Ticketing System",
      description: "Comprehensive ticketing system with automated workflows and enterprise-level scalability",
      longDescription: "Developed a comprehensive enterprise ticketing system that streamlines IT support operations and enhances customer service delivery. Built with ASP.NET Core MVC using clean architecture with layered design, Entity Framework Core with SQL Server for robust data management, and integrated Identity system for secure authentication and authorization. Features automated ticket assignment workflows, escalation rules, Azure DevOps pipeline integration, Docker containerization, and Azure cloud deployment. Demonstrates expertise in enterprise-level workflow automation, scalable architecture, and modern DevOps practices.",
      image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
      github: "https://github.com/elabdioui/Ticketing-System",
      demo: "#",
      tags: ["ASP.NET Core", "Entity Framework", "SQL Server", "Azure", "Docker", "DevOps"],
      icon: <Users className="w-6 h-6" />,
      features: [
        "Automated ticket assignment and escalation",
        "Role-based access control with Identity",
        "Real-time notifications and updates",
        "Azure cloud deployment with CI/CD",
        "Docker containerization",
        "Comprehensive reporting dashboard"
      ]
    },
    {
      title: "BMekog - Modern E-Commerce Platform",
      description: "Scalable e-commerce solution built with ASP.NET Core 9.0 and modern web practices",
      longDescription: "Created a modern e-commerce platform that streamlines online retail operations and enhances customer shopping experience. Built with ASP.NET Core 9.0 using MVC architecture, Entity Framework Core for robust data management, and integrated Identity system for secure user authentication. Features include comprehensive product management, intelligent shopping cart functionality, secure order processing system, and payment integration. Demonstrates expertise in full-stack development, database optimization, security best practices, and scalable web application architecture.",
      image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
      github: "https://github.com/elabdioui/EcommerceProjectNew",
      demo: "#",
      tags: ["ASP.NET Core 9.0", "Entity Framework", "MVC", "Identity", "SQL Server", "Bootstrap"],
      icon: <Zap className="w-6 h-6" />,
      features: [
        "Product catalog with advanced filtering",
        "Secure user authentication and authorization",
        "Shopping cart and checkout system",
        "Order management and tracking",
        "Admin dashboard for inventory management",
        "Responsive design with modern UI/UX"
      ]
    },
    {
      title: "Sinistre - Insurance Claims Management",
      description: "Enterprise-level insurance claims processing system with automated workflows",
      longDescription: "Developed a comprehensive insurance claims management system that automates claims processing, client data management, and policy administration for insurance companies. Built with modern web technologies focusing on data integrity, process automation, and intuitive user experience. Features include automated claims workflow, policy management, client portal, document management, and comprehensive reporting. Demonstrates expertise in enterprise-level data management, business process automation, and regulatory compliance in the insurance industry.",
      image: "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
      github: "https://github.com/elabdioui/Sinistre",
      demo: "#",
      tags: ["Database Management", "Process Automation", "Web Development", "Business Logic", "Data Security"],
      icon: <Shield className="w-6 h-6" />,
      features: [
        "Automated claims processing workflow",
        "Policy and client data management",
        "Document upload and management",
        "Real-time status tracking",
        "Compliance reporting and analytics",
        "Multi-role user access control"
      ]
    },
    {
      title: "Django Full-Stack Web Application",
      description: "Comprehensive Django-based project showcasing modern Python web development",
      longDescription: "Developed a sophisticated Django-based web application that demonstrates full-stack development skills and modern Python web development practices. Built using Django's powerful ORM for database design, integrated admin interface for content management, and scalable MVC architecture. Features include user authentication system, dynamic content management, RESTful API endpoints, and responsive frontend design. Demonstrates expertise in Python web development, database optimization, security best practices, and scalable web application architecture suitable for real-world deployment.",
      image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
      github: "https://github.com/elabdioui/Django-PFA",
      demo: "#",
      tags: ["Django", "Python", "PostgreSQL", "REST API", "Bootstrap", "JavaScript"],
      icon: <Database className="w-6 h-6" />,
      features: [
        "Django ORM for complex database operations",
        "User authentication and authorization",
        "Admin interface for content management",
        "RESTful API development",
        "Responsive frontend with modern UI",
        "Scalable MVC architecture"
      ]
    },
    {
      title: "Python Algorithms & Utilities Collection",
      description: "Comprehensive Python project demonstrating programming fundamentals and problem-solving",
      longDescription: "Created a comprehensive collection of Python utilities and algorithms that demonstrates programming fundamentals, algorithm implementation, and data processing capabilities. Features clean code practices, efficient algorithm implementations, and practical automation scripts. Includes data structures, sorting algorithms, search algorithms, and utility functions for various programming challenges. Demonstrates expertise in Python programming, algorithm design, code optimization, and software engineering best practices with focus on maintainable and scalable code architecture.",
      image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
      github: "https://github.com/elabdioui/index.py",
      demo: "#",
      tags: ["Python", "Algorithms", "Data Structures", "Automation", "Clean Code"],
      icon: <Code className="w-6 h-6" />,
      features: [
        "Algorithm implementations and optimizations",
        "Data structure demonstrations",
        "Automation scripts and utilities",
        "Clean code practices and documentation",
        "Performance optimization techniques",
        "Modular and reusable code architecture"
      ]
    }
  ], []);

  const allTags = useMemo(() => ["All", ...new Set(projects.flatMap(p => p.tags))], [projects]);

  const filteredProjects = useMemo(() => 
    projects.filter(project => 
      filter === "All" || project.tags.includes(filter)
    ), [projects, filter]
  );

  // Memoize stars to prevent recreation
  const stars = useMemo(() => 
    [...Array(50)].map((_, i) => ({
      id: i,
      width: Math.random() * 2 + 1,
      height: Math.random() * 2 + 1,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.5 + 0.3,
    })), []
  );

  return (
    <section id="projects" className="py-20 bg-[#0B1120] relative overflow-hidden">
      {/* Optimized Animated Stars Background */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute bg-white rounded-full"
            style={{
              width: star.width,
              height: star.height,
              left: star.left,
              top: star.top,
              opacity: star.opacity,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [star.opacity, star.opacity * 1.5, star.opacity],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Featured Projects
            </span>
          </h2>
          <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
            Explore my portfolio of enterprise-level applications, showcasing expertise in 
            full-stack development, scalable architecture, and modern web technologies.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {allTags.slice(0, 8).map((tag, index) => (
              <motion.button
                key={tag}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === tag
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'bg-gray-900/50 text-gray-300 hover:bg-gray-800/50 border border-white/10'
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

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-gray-900/30 backdrop-blur-sm rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-blue-400/30 transition-all duration-300"
                  onClick={() => setSelectedProject(project)}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  {/* Project Image */}
                  <div className="relative overflow-hidden">
                    <LazyImage
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Project Icon */}
                    <div className="absolute top-4 left-4 p-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                      {project.icon}
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex gap-4">
                        <motion.a
                          href={project.github}
                          className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                          whileHover={{ scale: 1.1, rotate: 360 }}
                          onClick={e => e.stopPropagation()}
                        >
                          <Github className="w-5 h-5 text-white" />
                        </motion.a>
                        <motion.button
                          className="p-3 bg-blue-500/80 backdrop-blur-sm rounded-full hover:bg-blue-600/80 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          onClick={e => {
                            e.stopPropagation();
                            setSelectedProject(project);
                          }}
                        >
                          <ExternalLink className="w-5 h-5 text-white" />
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 text-xs font-medium bg-gray-800/50 text-gray-300 rounded-lg border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-400 rounded-lg border border-blue-400/20">
                          +{project.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Project Modal */}
          <AnimatePresence>
            {selectedProject && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                onClick={() => setSelectedProject(null)}
              >
                <motion.div
                  initial={{ scale: 0.8, y: 50 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.8, y: 50 }}
                  className="bg-gray-900/95 backdrop-blur-md rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/10 relative"
                  onClick={e => e.stopPropagation()}
                >
                  {/* Close Button */}
                  <button
                    className="absolute top-6 right-6 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                    onClick={() => setSelectedProject(null)}
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>

                  {/* Project Header */}
                  <div className="flex items-start gap-6 mb-8">
                    <div className="p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl border border-white/10">
                      {selectedProject.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h3>
                      <p className="text-gray-300 text-lg">{selectedProject.description}</p>
                    </div>
                  </div>

                  {/* Project Image */}
                  <LazyImage
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-64 object-cover rounded-xl mb-8"
                  />

                  {/* Project Description */}
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold text-white mb-4">Project Overview</h4>
                    <p className="text-gray-300 leading-relaxed">{selectedProject.longDescription}</p>
                  </div>

                  {/* Key Features */}
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold text-white mb-4">Key Features</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedProject.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3 text-gray-300">
                          <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold text-white mb-4">Technologies Used</h4>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-2 bg-gray-800/50 text-gray-300 rounded-lg border border-white/10 text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <motion.a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="w-5 h-5" />
                      View Source Code
                    </motion.a>
                    <motion.button
                      className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white font-medium hover:bg-white/20 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Cloud className="w-5 h-5" />
                      Live Demo
                    </motion.button>
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