import { motion } from 'framer-motion';
import { 
  Camera, Code, Coffee, Gamepad, GraduationCap, Music, 
  Briefcase, Award, Users, Calendar, MapPin, Globe
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';

export function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const timeline = [
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
      color: "from-green-400 to-emerald-500"
    },
    {
      year: "2024",
      title: "Python Developer at SEWS-CABIND",
      type: "work",
      duration: "July 2024",
      description: "Developed billing management web application with Django",
      details: [
        "Built comprehensive billing system for IT products",
        "Automated data import from Excel files using Pandas",
        "Participated in full-cycle development: design, implementation, deployment"
      ],
      icon: <Code className="w-5 h-5" />,
      color: "from-blue-400 to-cyan-500"
    },
    {
      year: "2024",
      title: "EMSI IT Summer Competition",
      type: "achievement",
      duration: "2024",
      description: "Participated in competitive programming and development challenges",
      details: ["Showcased technical skills in competitive environment"],
      icon: <Award className="w-5 h-5" />,
      color: "from-yellow-400 to-orange-500"
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
      color: "from-purple-400 to-violet-500"
    },
    {
      year: "2023",
      title: "Technical University Degree",
      type: "education",
      duration: "Sept 2021 - June 2023",
      description: "Science & Technology - MIP at Hassan I University, Settat",
      details: [
        "Completed foundational studies in science and technology",
        "Specialized in Mathematical and Computer Methods in Physics (MIP)"
      ],
      icon: <GraduationCap className="w-5 h-5" />,
      color: "from-indigo-400 to-purple-500"
    },
    {
      year: "2021",
      title: "Scientific Baccalaureate",
      type: "education",
      duration: "2020 - 2021",
      description: "Physical Sciences & Chemistry at Lycée Al Yassamine, Berrechid",
      details: ["Strong foundation in scientific principles and analytical thinking"],
      icon: <GraduationCap className="w-5 h-5" />,
      color: "from-pink-400 to-rose-500"
    }
  ];

  const certifications = [
    "Oracle Cloud Infrastructure 2024 AI Foundations Associate",
    "Oracle Cloud Infrastructure 2024 Foundations Associate", 
    "Red Hat Enterprise Linux Fundamentals",
    "AWS DevOps Specialist",
    "Microsoft Back-End Developer",
    "Database Systems for Data Scientists"
  ];

  const leadership = [
    {
      title: "Google Developer Group (GDG) Leader",
      role: "Cloud Lead & Media Lead",
      description: "Leading technical workshops and community events on campus"
    },
    {
      title: "OppotunAI Hackathon",
      role: "Organizing Committee Member", 
      description: "Coordinated AI-focused hackathon events and mentored participants"
    },
    {
      title: "National Population Census",
      role: "Technical Contributor",
      description: "Participated in Morocco's RGPH2024 national census project"
    }
  ];

  const languages = [
    { name: "Arabic", level: "Native", flag: "🇲🇦" },
    { name: "French", level: "DELF B2", flag: "🇫🇷" },
    { name: "English", level: "Professional", flag: "🇺🇸" }
  ];

  const hobbies = [
    { icon: <Code className="w-6 h-6" />, label: 'Open Source', description: 'Contributing to open source projects and learning new technologies' },
    { icon: <Music className="w-6 h-6" />, label: 'Music Production', description: 'Creating electronic music and sound design' },
    { icon: <Camera className="w-6 h-6" />, label: 'Photography', description: 'Capturing architectural and nature photography' },
    { icon: <Gamepad className="w-6 h-6" />, label: 'Gaming', description: 'Strategy games and competitive programming challenges' },
    { icon: <Coffee className="w-6 h-6" />, label: 'Coffee Culture', description: 'Exploring different brewing methods and coffee origins' },
  ];

  return (
    <section id="about" className="py-20 bg-[#0B1120] text-white relative overflow-hidden">
      {/* Stars Background */}
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
              opacity: Math.random() * 0.7 + 0.3,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
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

      {/* Nebula Effects */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
            style={{
              width: Math.random() * 500 + 300,
              height: Math.random() * 500 + 300,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              About Me
            </span>
          </h2>
          <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
            Passionate software engineering student with hands-on experience in full-stack development, 
            cloud technologies, and innovative business solutions.
          </p>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
            {/* Personal Info & Photo */}
            <div className="xl:col-span-1 space-y-8">
              <motion.div
                className="relative group mx-auto w-80 h-80"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                <img
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
                  alt="Profile"
                  className="relative rounded-3xl shadow-2xl w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </motion.div>

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
            <div className="xl:col-span-2 space-y-8">
              <h3 className="text-2xl font-bold mb-8 text-center">My Journey</h3>
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
                    
                    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-colors group">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${item.color} text-white`}>
                          {item.duration}
                        </span>
                        <span className="text-xs text-gray-400 uppercase tracking-wider">
                          {item.type}
                        </span>
                      </div>
                      
                      <h4 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-gray-300 mb-4">{item.description}</p>
                      
                      <ul className="space-y-2">
                        {item.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="text-sm text-gray-400 flex items-start gap-2">
                            <span className="text-blue-400 mt-1">•</span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
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
                <motion.div
                  key={index}
                  className="bg-gray-900/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-400/30 transition-all group"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <Users className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold group-hover:text-purple-400 transition-colors">{item.title}</h4>
                      <p className="text-sm text-blue-400 mb-2">{item.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">{item.description}</p>
                </motion.div>
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
                <motion.div
                  key={index}
                  className="group relative bg-gray-900/30 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-blue-400/30"
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="p-6 text-center relative z-10">
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
                  </div>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}