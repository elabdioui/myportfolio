import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Tilt } from 'react-tilt';

const techStack = [
  // Programming Languages
  { name: 'JavaScript', icon: 'javascript' },
  { name: 'TypeScript', icon: 'typescript' },
  { name: 'Python', icon: 'python' },
  { name: 'Java', icon: 'java' },
  { name: 'C#', icon: 'csharp' },
  { name: 'C++', icon: 'cplusplus' },
  
  // Frontend
  { name: 'React', icon: 'react' },
  { name: 'Angular', icon: 'angular' },
  { name: 'HTML5', icon: 'html5' },
  { name: 'CSS3', icon: 'css3' },
  { name: 'Tailwind', icon: 'tailwindcss' },
  { name: 'Next.js', icon: 'nextdotjs' },
  
  // Backend
  { name: 'Node.js', icon: 'nodedotjs' },
  { name: 'Spring Boot', icon: 'springboot' },
  { name: 'Django', icon: 'django' },
  { name: '.NET', icon: 'dotnet' },
  { name: 'Express', icon: 'express' },
  
  // Databases
  { name: 'MongoDB', icon: 'mongodb' },
  { name: 'PostgreSQL', icon: 'postgresql' },
  { name: 'MySQL', icon: 'mysql' },
  { name: 'Oracle', icon: 'oracle' },
  { name: 'Redis', icon: 'redis' },
  
  // Cloud & DevOps
  { name: 'AWS', icon: 'amazonaws' },
  { name: 'Azure', icon: 'microsoftazure' },
  { name: 'Docker', icon: 'docker' },
  { name: 'Kubernetes', icon: 'kubernetes' },
  { name: 'Git', icon: 'git' },
  
  // Tools
  { name: 'VS Code', icon: 'visualstudiocode' },
  { name: 'IntelliJ', icon: 'intellijidea' },
  { name: 'Postman', icon: 'postman' },
  { name: 'Figma', icon: 'figma' },
  { name: 'Linux', icon: 'linux' }
];

export function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="skills" className="min-h-screen py-20 bg-[#0B1120] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.3,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
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
          className="text-center"
        >
          <h2 className="text-5xl font-bold mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Technical Skills
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-16">
            A showcase of the technologies I work with, from programming languages to development tools.
          </p>

          <div className="relative min-h-[600px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 relative z-10">
              {techStack.map((tech, index) => (
                <Tilt
                  key={index}
                  options={{
                    max: 25,
                    scale: 1.1,
                    speed: 1000,
                    glare: true,
                    "max-glare": 0.5,
                  }}
                >
                  <motion.div
                    className="relative bg-gray-900/30 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-blue-400/30 group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative z-10 flex flex-col items-center gap-3">
                      <img
                        src={`https://cdn.simpleicons.org/${tech.icon}/white`}
                        alt={tech.name}
                        className="w-12 h-12 transition-transform duration-300 group-hover:scale-110"
                      />
                      <span className="text-sm text-gray-300 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {tech.name}
                      </span>
                    </div>
                    
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                    />
                  </motion.div>
                </Tilt>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}