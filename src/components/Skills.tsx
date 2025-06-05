import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface IconCloudProps {
  skills: Array<{
    name: string;
    slug: string;
    category: string;
    image: string;
  }>;
}

function IconCloud({ skills }: IconCloudProps) {
  const [isGlobalHovered, setIsGlobalHovered] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const categoryColors = {
    languages: "from-blue-500 to-cyan-500",
    frameworks: "from-green-500 to-emerald-500", 
    databases: "from-purple-500 to-violet-500",
    devops: "from-orange-500 to-red-500",
    tools: "from-yellow-500 to-amber-500",
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Skill name display */}
      <motion.div 
        className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: hoveredSkill ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="bg-black/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20">
          <p className="text-white font-semibold text-lg">{hoveredSkill}</p>
        </div>
      </motion.div>

      <div 
        className="relative w-[500px] h-[500px] mx-auto"
        style={{
          perspective: '1200px',
          transformStyle: 'preserve-3d',
        }}
        onMouseEnter={() => setIsGlobalHovered(true)}
        onMouseLeave={() => {
          setIsGlobalHovered(false);
          setHoveredSkill(null);
        }}
      >
        <motion.div
          className="relative w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(20deg)',
          }}
          animate={{
            rotateY: isGlobalHovered ? [0, 360] : [0, 360],
          }}
          transition={{
            duration: isGlobalHovered ? 20 : 30,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {skills.map((skill, index) => {
            const total = skills.length;
            const phi = Math.acos(-1 + (2 * index) / total);
            const theta = Math.sqrt(total * Math.PI) * phi;
            const radius = 200;
            
            const x = radius * Math.cos(theta) * Math.sin(phi);
            const y = radius * Math.sin(theta) * Math.sin(phi);
            const z = radius * Math.cos(phi);

            const transform = `translate3d(${x}px, ${y}px, ${z}px) rotateY(${theta}rad) rotateX(${phi}rad)`;

            return (
              <motion.div
                key={skill.slug}
                className="absolute w-16 h-16"
                style={{
                  transform,
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'visible',
                  left: '50%',
                  top: '50%',
                  marginLeft: '-32px',
                  marginTop: '-32px',
                }}
                whileHover={{
                  scale: 1.2,
                  transition: { duration: 0.2 },
                }}
              >
                <motion.div
                  className="w-full h-full cursor-pointer"
                  style={{ transformStyle: 'preserve-3d' }}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  {/* Glow effect */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-r ${categoryColors[skill.category as keyof typeof categoryColors]} rounded-xl opacity-0`}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.6 }}
                    style={{ 
                      filter: 'blur(8px)',
                      transform: 'scale(1.2) translateZ(0)',
                    }}
                  />
                  
                  {/* Icon container */}
                  <motion.div 
                    className="relative w-14 h-14 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center"
                    style={{
                      transform: 'translateZ(20px)',
                    }}
                    whileHover={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      borderColor: 'rgba(255, 255, 255, 0.4)',
                    }}
                  >
                    <img
                      src={skill.image}
                      alt={skill.name}
                      className="w-8 h-8 object-contain"
                      style={{
                        filter: 'brightness(1.2) drop-shadow(0 0 10px rgba(255,255,255,0.3))',
                        transform: 'translateZ(0)',
                      }}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Category Legend */}
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        {Object.entries(categoryColors).map(([category, colors]) => (
          <div key={category} className="flex items-center gap-2">
            <div className={`w-3 h-3 bg-gradient-to-r ${colors} rounded-full`} />
            <span className="text-sm text-gray-300 capitalize">{category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skills = [
    // Languages
    { name: "Java", slug: "java", category: "languages" },
    { name: "C#", slug: "csharp", category: "languages" },
    { name: "C++", slug: "cplusplus", category: "languages" },
    { name: "Python", slug: "python", category: "languages" },
    { name: "JavaScript", slug: "javascript", category: "languages" },
    { name: "TypeScript", slug: "typescript", category: "languages" },
    
    // Frameworks
    { name: "Spring Boot", slug: "springboot", category: "frameworks" },
    { name: "ASP.NET", slug: "dotnet", category: "frameworks" },
    { name: "Django", slug: "django", category: "frameworks" },
    { name: "Angular", slug: "angular", category: "frameworks" },
    { name: "React", slug: "react", category: "frameworks" },
    
    // Databases
    { name: "MySQL", slug: "mysql", category: "databases" },
    { name: "Oracle", slug: "oracle", category: "databases" },
    { name: "PostgreSQL", slug: "postgresql", category: "databases" },
    { name: "SQL Server", slug: "microsoftsqlserver", category: "databases" },
    { name: "MongoDB", slug: "mongodb", category: "databases" },
    
    // DevOps
    { name: "Docker", slug: "docker", category: "devops" },
    { name: "AWS", slug: "amazonaws", category: "devops" },
    { name: "Azure", slug: "microsoftazure", category: "devops" },
    { name: "Linux", slug: "linux", category: "devops" },
    { name: "Git", slug: "git", category: "devops" },
    { name: "GitHub", slug: "github", category: "devops" },
    
    // Tools
    { name: "VS Code", slug: "visualstudiocode", category: "tools" },
    { name: "IntelliJ", slug: "intellijidea", category: "tools" },
    { name: "Postman", slug: "postman", category: "tools" },
  ];

  const techImages = skills.map(skill => ({
    ...skill,
    image: `https://cdn.simpleicons.org/${skill.slug}`,
  }));

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
            Explore my technical skills through this interactive sphere. 
            Hover over the icons to discover each technology I master.
          </p>

          <div className="flex justify-center items-center min-h-[700px]">
            <IconCloud skills={techImages} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}