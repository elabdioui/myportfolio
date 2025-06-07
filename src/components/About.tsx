import { motion } from 'framer-motion';
import { Camera, Code, Percent as Soccer, Gamepad, GraduationCap, Briefcase, Award, Users, Calendar, MapPin, Globe, History, Plane, TrendingUp } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { Tilt } from 'react-tilt';
import { LazyImage } from './LazyImage';
import { useMemo } from 'react';

export function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Memoize static data to prevent recreation
  const timeline = useMemo(() => [
    {
      year: "2024",
      title: "Software Engineer at OLA-Energy",
      type: "work",
      duration: "Aug - Sept 2024",
      description: "Led software architecture design for LPG IN THE BOX application",
      details: [
        "Designed database architecture and software systems",
        "Developed inventory management modules for Cameroon stores",
        "Enhanced GMAO tools using VBA",
        "Built user interfaces with Power Apps and real-time dashboards with Power BI"
      ],
      icon: <Briefcase className="w-5 h-5" />,
      color: "from-green-400 to-emerald-500",
      story: "Leading the digital transformation of LPG distribution systems across Cameroon",
      logo: "/src/assets/ola-energy-logo.png"
    },
    {
      year: "2024",
      title: "Python Developer at SEWS-CABIND",
      type: "work",
      duration: "July 2024",
      description: "Building the foundation of IT product billing automation",
      details: [
        "Built comprehensive billing system for IT products",
        "Automated data import from Excel files using Pandas",
        "Participated in full-cycle development: design, implementation, deployment"
      ],
      icon: <Code className="w-5 h-5" />,
      color: "from-blue-400 to-cyan-500",
      story: "Transforming manual billing processes into an automated, efficient system",
      logo: "/src/assets/sews-cabind-logo.png"
    },
    {
      year: "2023",
      title: "Engineering Degree - MIAGE",
      type: "education",
      duration: "Sept 2023 - Present",
      description: "Computer Science & Networks Engineering at EMSI Casablanca",
      details: [
        "Specialization in MIAGE (Computer Methods Applied to Business Management)",
        "Focus on software engineering, network systems, and business applications"
      ],
      icon: <GraduationCap className="w-5 h-5" />,
      color: "from-purple-400 to-violet-500",
      story: "Mastering the intersection of technology and business management",
      logo: "/src/assets/emsi-logo.png",
      technologies: ["react", "nodejs", "python", "java", "csharp"]
    },
    {
      year: "2021",
      title: "Technical University Degree",
      type: "education",
      duration: "Sept 2021 - June 2023",
      description: "Science & Technology - MIP at Hassan I University, Settat",
      details: [
        "Completed foundational studies in science and technology",
        "Specialized in Mathematical and Computer Methods in Physics (MIP)"
      ],
      icon: <GraduationCap className="w-5 h-5" />,
      color: "from-indigo-400 to-purple-500",
      story: "Discovering the mathematical foundations of computer science",
      logo: "/src/assets/fst.png",
      technologies: ["python", "java", "matlab"]
    },
    {
      year: "2021",
      title: "Scientific Baccalaureate",
      type: "education",
      duration: "2020 - 2021",
      description: "Physical Sciences & Chemistry at Yassamine International School, Berrechid",
      details: ["Strong foundation in scientific principles and analytical thinking"],
      icon: <GraduationCap className="w-5 h-5" />,
      color: "from-pink-400 to-rose-500",
      story: "Where analytical thinking and problem-solving skills were born",
      logo: "/src/assets/yassamine-school-logo.png"
    }
  ], []);

  const certifications = useMemo(() => [
    "Oracle Cloud Infrastructure 2024 AI Foundations Associate",
    "Oracle Cloud Infrastructure 2024 Foundations Associate", 
    "Red Hat Enterprise Linux Fundamentals",
    "AWS DevOps Specialist",
    "Microsoft Back-End Developer",
    "Database Systems for Data Scientists"
  ], []);

  const leadership = useMemo(() => [
    {
      title: "Google Developer Group (GDG) Leader",
      role: "Cloud Lead & Media Lead",
      description: "Leading technical workshops and community events on campus",
      logo: "/src/assets/gdg-logo.png"
    },
    {
      title: "OppotunAI Hackathon",
      role: "Organizing Committee Member", 
      description: "Coordinated AI-focused hackathon events and mentored participants",
      logo: "/src/assets/opportunai-logo.png"
    },
    {
      title: "National Population Census",
      role: "Technical Contributor",
      description: "Participated in Morocco's RGPH2024 national census project",
      logo: "/src/assets/rgph2024-logo.png"
    }
  ], []);

  const languages = useMemo(() => [
    { name: "Arabic", level: "Native", flag: "🇲🇦" },
    { name: "French", level: "DELF B2", flag: "🇫🇷" },
    { name: "English", level: "Professional", flag: "🇺🇸" }
  ], []);

  const hobbies = useMemo(() => [
    { 
      icon: <Soccer className="w-6 h-6" />, 
      label: 'Football', 
      description: 'Playing and watching football matches with friends'
    },
    { 
      icon: <Gamepad className="w-6 h-6" />, 
      label: 'Gaming', 
      description: 'Enjoying competitive gaming and esports'
    },
    { 
      icon: <Plane className="w-6 h-6" />, 
      label: 'Travelling', 
      description: 'Exploring new cultures and destinations'
    },
    { 
      icon: <History className="w-6 h-6" />, 
      label: 'History', 
      description: 'Learning about world history and civilizations'
    },
    { 
      icon: <TrendingUp className="w-6 h-6" />, 
      label: 'Trading', 
      description: 'Following markets and trading strategies'
    },
  ], []);

  // Memoize stars to prevent recreation
  const stars = useMemo(() => 
    [...Array(50)].map((_, i) => ({
      id: i,
      width: Math.random() * 2 + 1,
      height: Math.random() * 2 + 1,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.7 + 0.3,
    })), []
  );

  return (
    <section id="about" className="py-20 bg-[#0B1120] text-white relative overflow-hidden">
      {/* Optimized Stars Background */}
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
              opacity: [star.opacity, star.opacity * 1.5, star.opacity],
              scale: [1, 1.2, 1],
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
              About Me
            </span>
          </h2>
          <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
            Passionate software engineering student with hands-on experience in full-stack development, 
            cloud technologies, and innovative business solutions.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Personal Info & Photo */}
            <div className="lg:col-span-4 space-y-8">
              <Tilt
                className="relative group mx-auto w-full max-w-sm"
                options={{
                  max: 25,
                  scale: 1.05,
                  speed: 1000,
                  glare: true,
                  "max-glare": 0.5,
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                  <LazyImage
                    src="/src/assets/maphoto.jpg"
                    alt="Profile Photo"
                    className="relative rounded-3xl shadow-2xl w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
              </Tilt>

              {/* Quick Facts */}
              <motion.div
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-400" />
                  Quick Facts
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-purple-400" />
                    <span className="text-gray-300">Casablanca, Morocco</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300">Available for Internship - July 2025</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-orange-400" />
                    <span className="text-gray-300">GDG Campus Leader</span>
                  </div>
                </div>
              </motion.div>

              {/* Languages */}
              <motion.div
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h3 className="text-xl font-semibold mb-4">Languages</h3>
                <div className="space-y-3">
                  {languages.map((lang, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{lang.flag}</span>
                        <span className="text-gray-300">{lang.name}</span>
                      </div>
                      <span className="text-sm text-blue-400 font-medium">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Timeline */}
            <div className="lg:col-span-8 space-y-8">
              <h3 className="text-2xl font-bold mb-8">My Journey</h3>
              <div className="relative">
                <div className="absolute left-8 inset-y-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" />
                
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    className="relative pl-20 pb-12 last:pb-0"
                    initial={{ opacity: 0, x: -50 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className={`absolute left-6 w-6 h-6 -translate-x-3 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center`}>
                      {item.icon}
                    </div>
                    
                    <Tilt
                      className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-colors group"
                      options={{
                        max: 15,
                        scale: 1.02,
                        speed: 1000,
                      }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <LazyImage 
                            src={item.logo} 
                            alt={`${item.title} logo`}
                            className="w-12 h-12 object-contain rounded-lg bg-white/10 p-2"
                          />
                          <div>
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${item.color} text-white`}>
                              {item.duration}
                            </span>
                            <span className="ml-2 text-xs text-gray-400 uppercase tracking-wider">
                              {item.type}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <h4 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                        {item.title}
                      </h4>
                      
                      <p className="text-lg text-blue-300 italic mb-4">"{item.story}"</p>
                      <p className="text-gray-300 mb-4">{item.description}</p>
                      
                      <ul className="space-y-2 mb-4">
                        {item.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="text-sm text-gray-400 flex items-start gap-2">
                            <span className="text-blue-400 mt-1">•</span>
                            {detail}
                          </li>
                        ))}
                      </ul>

                      {item.technologies && (
                        <div className="flex flex-wrap gap-3 mt-4">
                          {item.technologies.map((tech, techIndex) => (
                            <LazyImage
                              key={techIndex}
                              src={`https://cdn.simpleicons.org/${tech}`}
                              alt={tech}
                              className="w-6 h-6 opacity-70 hover:opacity-100 transition-opacity"
                            />
                          ))}
                        </div>
                      )}

                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={false}
                      />
                    </Tilt>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Certifications */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-8 text-center">Professional Certifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-900/30 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-blue-400/30 transition-all hover:scale-105"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{cert}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Leadership Experience */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <h3 className="text-2xl font-bold mb-8 text-center">Leadership & Community</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {leadership.map((item, index) => (
                <Tilt
                  key={index}
                  className="bg-gray-900/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-400/30 transition-all group"
                  options={{
                    max: 25,
                    scale: 1.05,
                    speed: 1000,
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 flex-shrink-0">
                        <LazyImage 
                          src={item.logo} 
                          alt={`${item.title} logo`}
                          className="w-full h-full object-contain rounded-lg bg-white/5 p-1"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold group-hover:text-purple-400 transition-colors">{item.title}</h4>
                        <p className="text-sm text-blue-400 mb-2">{item.role}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </motion.div>
                </Tilt>
              ))}
            </div>
          </motion.div>

          {/* Interests & Hobbies */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <h3 className="text-2xl font-bold mb-8 text-center">Interests & Hobbies</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {hobbies.map((hobby, index) => (
                <Tilt
                  key={index}
                  className="group relative bg-gray-900/30 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-blue-400/30"
                  options={{
                    max: 25,
                    scale: 1.05,
                    speed: 1000,
                    glare: true,
                    "max-glare": 0.5,
                  }}
                >
                  <motion.div
                    className="p-6 text-center relative z-10"
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {hobby.icon}
                    </motion.div>
                    <h4 className="font-medium mb-2 group-hover:text-blue-400 transition-colors">{hobby.label}</h4>
                    <p className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {hobby.description}
                    </p>
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                </Tilt>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}