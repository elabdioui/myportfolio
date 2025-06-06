import { motion } from 'framer-motion';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { Code, Database, Cloud, Settings, Wrench, Star } from 'lucide-react';
import { LazyImage } from './LazyImage';

interface Skill {
  name: string;
  slug: string;
  category: string;
  image: string;
  proficiency: number;
}

interface IconCloudProps {
  skills: Skill[];
}

function IconCloud({ skills }: IconCloudProps) {
  const [isGlobalHovered, setIsGlobalHovered] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const categoryColors = useMemo(() => ({
    languages: "from-blue-500 to-cyan-500",
    frameworks: "from-green-500 to-emerald-500", 
    databases: "from-purple-500 to-violet-500",
    devops: "from-orange-500 to-red-500",
    tools: "from-yellow-500 to-amber-500",
  }), []);

  const categoryIcons = useMemo(() => ({
    languages: <Code className="w-4 h-4" />,
    frameworks: <Settings className="w-4 h-4" />,
    databases: <Database className="w-4 h-4" />,
    devops: <Cloud className="w-4 h-4" />,
    tools: <Wrench className="w-4 h-4" />,
  }), []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    if (containerRef.current) {
      containerRef.current.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  // Memoize skill positions to prevent recalculation
  const skillPositions = useMemo(() => {
    return skills.map((skill, index) => {
      const total = skills.length;
      const phi = Math.acos(-1 + (2 * index) / total);
      const theta = Math.sqrt(total * Math.PI) * phi;
      const radius = 220;
      
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      return { skill, x, y, z };
    });
  }, [skills]);

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Skill Tooltip */}
      <motion.div 
        className="fixed z-50 pointer-events-none"
        style={{
          left: mousePosition.x + (containerRef.current?.getBoundingClientRect().left || 0) + 20,
          top: mousePosition.y + (containerRef.current?.getBoundingClientRect().top || 0) - 100,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: hoveredSkill ? 1 : 0,
          scale: hoveredSkill ? 1 : 0.8,
        }}
        transition={{ duration: 0.2 }}
      >
        {hoveredSkill && (
          <div className="bg-black/95 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/20 shadow-2xl max-w-xs">
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-1 bg-gradient-to-r ${categoryColors[hoveredSkill.category as keyof typeof categoryColors]} rounded-md`}>
                {categoryIcons[hoveredSkill.category as keyof typeof categoryIcons]}
              </div>
              <p className="text-white font-semibold text-lg">{hoveredSkill.name}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-300 text-sm">Proficiency:</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < hoveredSkill.proficiency 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-blue-400 text-sm font-medium">
                {hoveredSkill.proficiency}/5
              </span>
            </div>
          </div>
        )}
      </motion.div>

      <div 
        ref={containerRef}
        className="relative w-[600px] h-[600px] mx-auto skills-3d-container"
        onMouseEnter={() => setIsGlobalHovered(true)}
        onMouseLeave={() => {
          setIsGlobalHovered(false);
          setHoveredSkill(null);
        }}
      >
        <motion.div
          className="relative w-full h-full skills-3d-sphere"
          animate={{
            rotateY: isGlobalHovered ? 0 : 360,
            rotateX: isGlobalHovered ? 0 : 10,
          }}
          transition={{
            duration: isGlobalHovered ? 1 : 25,
            ease: "linear",
            repeat: isGlobalHovered ? 0 : Infinity,
          }}
        >
          {skillPositions.map(({ skill, x, y, z }, index) => {
            const isHovered = hoveredSkill?.slug === skill.slug;

            return (
              <motion.div
                key={skill.slug}
                className="absolute w-20 h-20 flex items-center justify-center cursor-pointer skills-3d-item"
                style={{
                  transform: `translate3d(${x}px, ${y}px, ${z}px)`,
                  left: '50%',
                  top: '50%',
                  marginLeft: '-40px',
                  marginTop: '-40px',
                }}
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => {
                  setTimeout(() => {
                    if (hoveredSkill?.slug === skill.slug) {
                      setHoveredSkill(null);
                    }
                  }, 100);
                }}
                whileHover={{
                  scale: 1.4,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="relative group w-full h-full">
                  {/* Glow effect based on category */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-r ${categoryColors[skill.category as keyof typeof categoryColors]} rounded-2xl blur-lg transition-opacity duration-300`}
                    style={{ transform: 'scale(1.3)' }}
                    animate={{
                      opacity: isHovered ? 0.7 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Icon container with 3D effect */}
                  <motion.div
                    className="relative z-10 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 mx-auto shadow-2xl"
                    animate={{
                      transform: isHovered ? 'translateZ(30px)' : 'translateZ(0px)',
                      borderColor: isHovered ? 'rgba(59, 130, 246, 0.5)' : 'rgba(255, 255, 255, 0.2)',
                    }}
                    transition={{ duration: 0.3 }}
                    whileHover={{
                      rotateY: 360,
                      transition: { duration: 0.6 }
                    }}
                  >
                    <LazyImage
                      src={skill.image}
                      alt={skill.name}
                      className="w-10 h-10 object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300 pointer-events-none"
                    />
                  </motion.div>
                  
                  {/* Category indicator */}
                  <motion.div 
                    className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gradient-to-r ${categoryColors[skill.category as keyof typeof categoryColors]} rounded-full shadow-lg`}
                    animate={{
                      opacity: isHovered ? 1 : 0.7,
                      scale: isHovered ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Proficiency indicator */}
                  <motion.div 
                    className="absolute -top-1 -right-1 w-5 h-5 bg-black/80 rounded-full flex items-center justify-center border border-white/20"
                    animate={{
                      scale: isHovered ? 1.2 : 1,
                      borderColor: isHovered ? 'rgba(59, 130, 246, 0.5)' : 'rgba(255, 255, 255, 0.2)',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-xs text-white font-bold">{skill.proficiency}</span>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* Luminous center with pulsing effect */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div 
            className="w-40 h-40 bg-gradient-to-r from-blue-500/20 via-purple-500/30 to-pink-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.3, 0.7, 0.3],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </div>

        {/* Orbital rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute border border-white/10 rounded-full"
              style={{
                width: 200 + i * 100,
                height: 200 + i * 100,
              }}
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20 + i * 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      </div>

      {/* Enhanced Category Legend */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(categoryColors).map(([category, colors]) => {
          const categorySkills = skills.filter(skill => skill.category === category);
          const avgProficiency = categorySkills.reduce((sum, skill) => sum + skill.proficiency, 0) / categorySkills.length;
          
          return (
            <motion.div 
              key={category} 
              className="bg-gray-900/30 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all group"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 bg-gradient-to-r ${colors} rounded-lg`}>
                  {categoryIcons[category as keyof typeof categoryIcons]}
                </div>
                <div>
                  <h4 className="text-white font-semibold capitalize text-sm">{category}</h4>
                  <p className="text-gray-400 text-xs">{categorySkills.length} skills</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.round(avgProficiency) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-400">
                  {avgProficiency.toFixed(1)}/5
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Memoize skills data to prevent recreation
  const skills: Skill[] = useMemo(() => [
    // Languages
    { name: "Java", slug: "java", category: "languages", proficiency: 5 },
    { name: "C#", slug: "csharp", category: "languages", proficiency: 5 },
    { name: "C++", slug: "cplusplus", category: "languages", proficiency: 4 },
    { name: "Python", slug: "python", category: "languages", proficiency: 5 },
    { name: "JavaScript", slug: "javascript", category: "languages", proficiency: 5 },
    { name: "TypeScript", slug: "typescript", category: "languages", proficiency: 4 },
    
    // Frameworks
    { name: "Spring Boot", slug: "springboot", category: "frameworks", proficiency: 4 },
    { name: "ASP.NET", slug: "dotnet", category: "frameworks", proficiency: 5 },
    { name: "Django", slug: "django", category: "frameworks", proficiency: 4 },
    { name: "Angular", slug: "angular", category: "frameworks", proficiency: 4 },
    { name: "React", slug: "react", category: "frameworks", proficiency: 5 },
    { name: "Node.js", slug: "nodedotjs", category: "frameworks", proficiency: 4 },
    
    // Databases
    { name: "MySQL", slug: "mysql", category: "databases", proficiency: 5 },
    { name: "Oracle", slug: "oracle", category: "databases", proficiency: 4 },
    { name: "PostgreSQL", slug: "postgresql", category: "databases", proficiency: 4 },
    { name: "SQL Server", slug: "microsoftsqlserver", category: "databases", proficiency: 5 },
    { name: "MongoDB", slug: "mongodb", category: "databases", proficiency: 4 },
    
    // DevOps
    { name: "Docker", slug: "docker", category: "devops", proficiency: 4 },
    { name: "AWS", slug: "amazonaws", category: "devops", proficiency: 3 },
    { name: "Azure", slug: "microsoftazure", category: "devops", proficiency: 4 },
    { name: "Linux", slug: "linux", category: "devops", proficiency: 4 },
    { name: "Git", slug: "git", category: "devops", proficiency: 5 },
    { name: "GitHub", slug: "github", category: "devops", proficiency: 5 },
    
    // Tools
    { name: "VS Code", slug: "visualstudiocode", category: "tools", proficiency: 5 },
    { name: "IntelliJ", slug: "intellijidea", category: "tools", proficiency: 4 },
    { name: "Postman", slug: "postman", category: "tools", proficiency: 4 },
    { name: "Figma", slug: "figma", category: "tools", proficiency: 3 },
  ], []);

  const techImages = useMemo(() => skills.map(skill => ({
    ...skill,
    image: `https://cdn.simpleicons.org/${skill.slug}`,
  })), [skills]);

  // Memoize stars to prevent recreation
  const stars = useMemo(() => 
    [...Array(75)].map((_, i) => ({
      id: i,
      width: Math.random() * 3 + 1,
      height: Math.random() * 3 + 1,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.6 + 0.2,
    })), []
  );

  return (
    <>
      {/* Enhanced CSS for 3D Effects */}
      <style>{`
        .skills-3d-container {
          perspective: 1500px;
          perspective-origin: center center;
        }
        .skills-3d-sphere {
          transform-style: preserve-3d;
          backface-visibility: visible;
        }
        .skills-3d-item {
          transform-style: preserve-3d;
          backface-visibility: visible;
        }
        
        /* Enhanced glow effects */
        .skills-3d-item:hover {
          filter: drop-shadow(0 0 30px rgba(59, 130, 246, 0.6));
        }
        
        /* Smooth transitions */
        .skills-3d-item * {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>

      <section id="skills" className="min-h-screen py-20 bg-[#0B1120] relative overflow-hidden">
        {/* Optimized Animated Background */}
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
                scale: [1, 1.8, 1],
                opacity: [star.opacity, star.opacity * 1.5, star.opacity],
                x: [0, Math.random() * 100 - 50, 0],
                y: [0, Math.random() * 100 - 50, 0],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
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
            <motion.h2 
              className="text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                Technical Expertise
              </span>
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-300 max-w-4xl mx-auto mb-16 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Explore my comprehensive skill set through this interactive 3D sphere. 
              Each technology represents years of hands-on experience and continuous learning.
              <br />
              <span className="text-blue-400 font-medium">Hover over any skill to see detailed proficiency levels.</span>
            </motion.p>

            <motion.div 
              className="flex justify-center items-center min-h-[800px]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <IconCloud skills={techImages} />
            </motion.div>

            {/* Skills Summary */}
            <motion.div
              className="mt-16 bg-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Skills Overview</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-400 mb-2">{skills.filter(s => s.category === 'languages').length}</div>
                  <div className="text-gray-300">Programming Languages</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-400 mb-2">{skills.filter(s => s.category === 'frameworks').length}</div>
                  <div className="text-gray-300">Frameworks & Libraries</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-400 mb-2">{skills.filter(s => s.category === 'databases').length}</div>
                  <div className="text-gray-300">Database Systems</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-400 mb-2">{skills.filter(s => s.category === 'devops').length + skills.filter(s => s.category === 'tools').length}</div>
                  <div className="text-gray-300">DevOps & Tools</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}