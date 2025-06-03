import { motion } from 'framer-motion';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Code, Database, Cloud, Settings, Palette,  } from 'lucide-react';

// IconCloud Component
interface IconCloudProps {
  images: string[];
}

function IconCloud({ images }: IconCloudProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-96 h-96 mx-auto perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{
          rotateY: isHovered ? 45 : 360,
          rotateX: isHovered ? 10 : 15,
        }}
        transition={{
          duration: isHovered ? 2 : 25,
          ease: "linear",
          repeat: isHovered ? 0 : Infinity,
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {images.map((src, index) => {
          const total = images.length;
          const phi = Math.acos(-1 + (2 * index) / total);
          const theta = Math.sqrt(total * Math.PI) * phi;
          const radius = 160;
          
          const x = radius * Math.cos(theta) * Math.sin(phi);
          const y = radius * Math.sin(theta) * Math.sin(phi);
          const z = radius * Math.cos(phi);

          return (
            <motion.div
              key={index}
              className="absolute w-12 h-12 flex items-center justify-center"
              style={{
                transform: `translate3d(${x}px, ${y}px, ${z}px)`,
                transformStyle: "preserve-3d",
              }}
              whileHover={{
                scale: 1.5,
                z: 100,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/40 to-purple-500/40 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img
                  src={src}
                  alt={`Technology ${index}`}
                  className="w-10 h-10 object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300 relative z-10 rounded-lg bg-white/10 p-1"
                  style={{
                    filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.6))',
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      
      {/* Center glow effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-40 h-40 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse" />
      </div>
      
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
}

export function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Technology skills based on Haitham's CV
  const techSlugs = [
    "java",
    "csharp", 
    "cplusplus",
    "python",
    "javascript",
    "typescript",
    "html5",
    "css3",
    "react",
    "angular",
    "springboot",
    "dotnet",
    "django",
    "nodejs",
    "mysql",
    "oracle",
    "postgresql",
    "mongodb",
    "microsoftsqlserver",
    "docker",
    "kubernetes",
    "amazonaws",
    "microsoftazure",
    "git",
    "github",
    "linux",
    "windows",
    "visualstudiocode",
    "intellijidea",
    "figma",
    "postman",
    "nginx",
    "redis",
    "elasticsearch"
  ];

  const techImages = techSlugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}`
  );

  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <Code className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      skills: [
        { name: "Java", level: 90, experience: "3 years", description: "Enterprise applications, Spring ecosystem" },
        { name: "Python", level: 85, experience: "2 years", description: "Django, data analysis, automation" },
        { name: "C#", level: 80, experience: "2 years", description: "ASP.NET, desktop applications" },
        { name: "JavaScript", level: 85, experience: "2 years", description: "ES6+, React, Node.js" },
        { name: "TypeScript", level: 75, experience: "1 year", description: "Type-safe development" },
        { name: "C/C++", level: 70, experience: "2 years", description: "System programming, algorithms" }
      ]
    },
    {
      title: "Frameworks & Libraries",
      icon: <Settings className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      skills: [
        { name: "Spring Boot", level: 88, experience: "2 years", description: "Microservices, REST APIs" },
        { name: "Django", level: 85, experience: "1 year", description: "Web development, ORM" },
        { name: "ASP.NET", level: 80, experience: "1 year", description: "Web APIs, MVC architecture" },
        { name: "React", level: 82, experience: "1.5 years", description: "Component-based UI development" },
        { name: "Angular", level: 78, experience: "1 year", description: "TypeScript, component architecture" },
        { name: "Node.js", level: 75, experience: "1 year", description: "Backend development, Express" }
      ]
    },
    {
      title: "Databases",
      icon: <Database className="w-6 h-6" />,
      color: "from-green-500 to-teal-500",
      skills: [
        { name: "Oracle SQL", level: 90, experience: "2 years", description: "Complex queries, PL/SQL" },
        { name: "MySQL", level: 85, experience: "2 years", description: "Database design, optimization" },
        { name: "PostgreSQL", level: 80, experience: "1 year", description: "Advanced SQL features" },
        { name: "SQL Server", level: 78, experience: "1 year", description: "T-SQL, stored procedures" },
        { name: "MongoDB", level: 75, experience: "1 year", description: "NoSQL, document databases" }
      ]
    },
    {
      title: "Cloud & DevOps",
      icon: <Cloud className="w-6 h-6" />,
      color: "from-orange-500 to-red-500",
      skills: [
        { name: "Oracle Cloud", level: 88, experience: "1 year", description: "OCI certified, AI foundations" },
        { name: "AWS", level: 75, experience: "1 year", description: "EC2, S3, DevOps practices" },
        { name: "Microsoft Azure", level: 70, experience: "1 year", description: "Cloud services, deployment" },
        { name: "Docker", level: 80, experience: "1 year", description: "Containerization, deployment" },
        { name: "Git/GitHub", level: 90, experience: "3 years", description: "Version control, collaboration" }
      ]
    },
    {
      title: "Tools & Technologies",
      icon: <Palette className="w-6 h-6" />,
      color: "from-indigo-500 to-purple-500",
      skills: [
        { name: "Power Apps", level: 85, experience: "6 months", description: "Low-code development" },
        { name: "Power BI", level: 80, experience: "6 months", description: "Data visualization, dashboards" },
        { name: "VBA", level: 75, experience: "1 year", description: "Excel automation, macros" },
        { name: "Linux/RHEL", level: 78, experience: "1 year", description: "System administration" },
        { name: "Visual Studio Code", level: 90, experience: "3 years", description: "IDE, extensions, debugging" }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-xl"
            style={{
              width: Math.random() * 400 + 100,
              height: Math.random() * 400 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.4, 0.1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: Math.random() * 25 + 15,
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
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Technical Skills
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              A comprehensive overview of my technical expertise across programming languages, 
              frameworks, databases, and cloud technologies.
            </p>
          </div>

          {/* 3D Icon Cloud */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="flex justify-center">
              <div className="relative">
                <IconCloud images={techImages} />
                <motion.div
                  className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  <p className="text-sm text-gray-400">
                    Hover over icons to explore • 35+ Technologies Mastered
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Skills Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                className="bg-gray-900/40 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + categoryIndex * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center`}>
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                </div>

                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      className="group relative"
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.9 + categoryIndex * 0.1 + skillIndex * 0.05 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-white font-semibold">{skill.name}</span>
                          <motion.div
                            className="relative cursor-help"
                            whileHover={{ scale: 1.1 }}
                          >
                            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-20">
                              <div className="font-medium mb-1">{skill.experience} experience</div>
                              <div className="text-gray-300 text-xs">{skill.description}</div>
                              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45" />
                            </div>
                            <span className="text-gray-400 text-sm">ℹ️</span>
                          </motion.div>
                        </div>
                        <span className="text-gray-400 font-medium">{skill.level}%</span>
                      </div>
                      
                      <div className="h-3 bg-gray-800 rounded-full overflow-hidden relative">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${category.color} relative`}
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : {}}
                          transition={{ duration: 1.2, delay: 1 + categoryIndex * 0.1 + skillIndex * 0.05 }}
                        >
                          <motion.div
                            className="absolute right-0 top-0 bottom-0 w-6 bg-white opacity-30"
                            animate={{
                              x: [0, 20, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatType: "reverse",
                              delay: 1.5 + categoryIndex * 0.1 + skillIndex * 0.05,
                            }}
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Achievement Stats */}
          <motion.div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            {[
              { label: "Technologies", value: "35+", icon: "⚡" },
              { label: "Certifications", value: "6", icon: "🏆" },
              { label: "Years Coding", value: "3+", icon: "💻" },
              { label: "Projects", value: "10+", icon: "🚀" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center bg-gray-900/30 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}