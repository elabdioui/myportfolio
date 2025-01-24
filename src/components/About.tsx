import { motion } from 'framer-motion';
import { Camera, Code, Coffee, Gamepad, GraduationCap, Music } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

export function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const timeline = [
    {
      year: "2024",
      title: "Web Development Bootcamp",
      description: "Completed intensive full-stack development program"
    },
    {
      year: "2023",
      title: "First Freelance Project",
      description: "Developed e-commerce website for local business"
    },
    {
      year: "2021",
      title: "Started Coding Journey",
      description: "Began learning HTML, CSS, and JavaScript"
    }
  ];

  const hobbies = [
    { icon: <Code className="w-6 h-6" />, label: 'Coding', description: 'Building web applications and learning new technologies' },
    { icon: <Music className="w-6 h-6" />, label: 'Music', description: 'Playing guitar and producing electronic music' },
    { icon: <Camera className="w-6 h-6" />, label: 'Photography', description: 'Capturing moments and editing photos' },
    { icon: <Gamepad className="w-6 h-6" />, label: 'Gaming', description: 'Strategy games and indie titles' },
    { icon: <Coffee className="w-6 h-6" />, label: 'Coffee', description: 'Exploring different brewing methods' },
  ];

  return (
    <section id="about" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              About Me
            </span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <motion.div
                className="w-64 h-64 mx-auto lg:mx-0 relative group"
                animate={{ rotateY: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop"
                  alt="Profile"
                  className="rounded-full shadow-2xl group-hover:scale-105 transition-transform duration-300"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  whileHover={{ scale: 1.1 }}
                />
              </motion.div>

              <div className="prose prose-invert max-w-none">
                <p className="text-lg leading-relaxed">
                  I'm a passionate web development student with a keen interest in creating beautiful and functional web applications. 
                  My journey in tech started with simple HTML pages, and now I'm diving deep into modern frameworks and best practices.
                </p>
              </div>
            </div>

            <div className="space-y-12">
              <div className="relative">
                <div className="absolute left-8 inset-y-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500" />
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    className="relative pl-12 pb-8 last:pb-0"
                    initial={{ opacity: 0, x: -50 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <div className="absolute left-6 w-4 h-4 -translate-x-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-ping opacity-75" />
                    </div>
                    <div className="bg-gray-900 rounded-lg p-4">
                      <span className="text-sm text-purple-400">{item.year}</span>
                      <h3 className="text-lg font-semibold mt-1 flex items-center gap-2">
                        <GraduationCap className="w-5 h-5" />
                        {item.title}
                      </h3>
                      <p className="text-gray-400 mt-1">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-8 text-center">Interests & Hobbies</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {hobbies.map((hobby, index) => (
                <motion.div
                  key={index}
                  className="group relative bg-gray-900 rounded-xl overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="p-6 text-center relative z-10">
                    <motion.div
                      className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {hobby.icon}
                    </motion.div>
                    <h4 className="font-medium mb-2">{hobby.label}</h4>
                    <p className="text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {hobby.description}
                    </p>
                  </div>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                    whileHover={{ scale: 1.2 }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}