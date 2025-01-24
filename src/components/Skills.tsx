import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const skills = [
  { name: "HTML/CSS", level: 90, years: 3, description: "Semantic HTML, CSS3, Flexbox, Grid" },
  { name: "JavaScript", level: 85, years: 2, description: "ES6+, DOM Manipulation, Async/Await" },
  { name: "React", level: 80, years: 2, description: "Hooks, Context, Redux, Next.js" },
  { name: "Node.js", level: 75, years: 1, description: "Express, REST APIs, MongoDB" },
  { name: "TypeScript", level: 70, years: 1, description: "Types, Interfaces, Generics" },
  { name: "Python", level: 65, years: 1, description: "Django, Flask, Data Analysis" }
];

export function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-10"
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
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
          <h2 className="text-4xl font-bold mb-12 text-center text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Skills
            </span>
          </h2>

          <div className="max-w-4xl mx-auto grid gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="mb-2 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <span className="text-white font-medium">{skill.name}</span>
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                        <div className="font-medium mb-1">{skill.years} years experience</div>
                        <div className="text-gray-400 text-xs">{skill.description}</div>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                      </div>
                      <span className="text-gray-400 text-sm cursor-help">ℹ️</span>
                    </motion.div>
                  </div>
                  <span className="text-gray-400">{skill.level}%</span>
                </div>
                <div className="h-4 bg-gray-900 rounded-full overflow-hidden relative">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 relative"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  >
                    <motion.div
                      className="absolute right-0 top-0 bottom-0 w-4 bg-white opacity-20"
                      animate={{
                        x: [0, 100, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}