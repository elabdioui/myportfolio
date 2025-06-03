import { motion } from 'framer-motion';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

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

          <div className="flex justify-center items-center min-h-[600px]">
            <IconCloud images={techImages} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}