import { motion, useAnimation, useTransform, useScroll } from 'framer-motion';
import { 
  Camera, Code, Coffee, Gamepad, GraduationCap, Music, 
  Briefcase, Award, Users, Calendar, MapPin, Globe, 
  Brain, Heart, Zap, Target, MessageSquare, Lightbulb,
  BookOpen, Rocket, Star
} from 'lucide-react';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Tilt } from 'react-tilt';

const softSkills = [
  { name: "Leadership", icon: <Users className="w-6 h-6" />, level: 90, description: "Led multiple teams and projects in academic and professional settings" },
  { name: "Problem Solving", icon: <Brain className="w-6 h-6" />, level: 95, description: "Strong analytical and creative problem-solving abilities" },
  { name: "Communication", icon: <MessageSquare className="w-6 h-6" />, level: 85, description: "Excellent verbal and written communication skills" },
  { name: "Adaptability", icon: <Zap className="w-6 h-6" />, level: 88, description: "Quick to adapt to new technologies and environments" },
  { name: "Initiative", icon: <Rocket className="w-6 h-6" />, level: 92, description: "Self-motivated and proactive in taking on new challenges" },
  { name: "Critical Thinking", icon: <Lightbulb className="w-6 h-6" />, level: 87, description: "Strong analytical and decision-making capabilities" }
];

const paraUniversityWork = [
  {
    title: "GDG Campus Leader",
    role: "Cloud Lead & Media Lead",
    description: "Leading technical workshops and organizing community events",
    icon: <Code className="w-6 h-6" />,
    achievements: ["500+ community members", "10+ workshops conducted", "5 major events organized"]
  },
  {
    title: "OppotunAI Hackathon",
    role: "Organizing Committee",
    description: "Coordinated AI-focused hackathon events and mentored participants",
    icon: <Brain className="w-6 h-6" />,
    achievements: ["200+ participants", "20+ projects", "3 successful editions"]
  },
  {
    title: "EMSI IT Competition",
    role: "Participant & Organizer",
    description: "Competed and helped organize technical challenges",
    icon: <Target className="w-6 h-6" />,
    achievements: ["Top 10 finish", "Led team of 4", "Technical challenge winner"]
  },
  {
    title: "National Census",
    role: "Technical Contributor",
    description: "Contributed to Morocco's RGPH2024 national census project",
    icon: <BookOpen className="w-6 h-6" />,
    achievements: ["Data analysis", "Technical documentation", "Process optimization"]
  }
];

const hobbies = [
  {
    icon: <Code className="w-8 h-8" />,
    name: "Open Source",
    description: "Contributing to community projects and learning new technologies",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: <Music className="w-8 h-8" />,
    name: "Music Production",
    description: "Creating electronic music and sound design",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: <Camera className="w-8 h-8" />,
    name: "Photography",
    description: "Capturing architectural and nature photography",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: <Gamepad className="w-8 h-8" />,
    name: "Gaming",
    description: "Strategy games and competitive programming",
    color: "from-green-500 to-teal-500"
  },
  {
    icon: <Coffee className="w-8 h-8" />,
    name: "Coffee Culture",
    description: "Exploring different brewing methods",
    color: "from-yellow-500 to-orange-500"
  }
];

export function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const controls = useAnimation();
  const { scrollYProgress } = useScroll();

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <section id="about" className="py-20 bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY, opacity }}
      >
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full"
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={controls}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                About Me
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Passionate software engineering student with a focus on innovation and community impact.
            </p>
          </motion.div>

          {/* Personal Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
            {/* Photo and Quick Info */}
            <Tilt
              className="lg:col-span-1"
              options={{
                max: 25,
                scale: 1.05,
                speed: 1000,
              }}
            >
              <motion.div
                className="relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative bg-gray-900 p-8 rounded-3xl border border-white/10">
                  <div className="relative w-full aspect-square mb-6 overflow-hidden rounded-2xl">
                    <img
                      src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
                      alt="Profile"
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-blue-400" />
                      <span>Casablanca, Morocco</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-purple-400" />
                      <span>Available for Internship - July 2025</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Star className="w-5 h-5 text-yellow-400" />
                      <span>GDG Campus Leader</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Tilt>

            {/* Soft Skills Hexagon Grid */}
            <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
              {softSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20">
                    <div className="flex flex-col items-center text-center">
                      <motion.div
                        className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        {skill.icon}
                      </motion.div>
                      <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
                      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : {}}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>
                      <p className="text-sm text-gray-400 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        {skill.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Para-University Work */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <h3 className="text-3xl font-bold text-center mb-12">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                Leadership & Community Impact
              </span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {paraUniversityWork.map((work, index) => (
                <motion.div
                  key={work.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20">
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {work.icon}
                    </motion.div>
                    <h4 className="text-xl font-semibold mb-2">{work.title}</h4>
                    <p className="text-purple-400 text-sm mb-4">{work.role}</p>
                    <p className="text-gray-300 text-sm mb-4">{work.description}</p>
                    <ul className="space-y-2">
                      {work.achievements.map((achievement, i) => (
                        <li key={i} className="text-sm text-gray-400 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Hobbies & Interests */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold text-center mb-12">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-500">
                Hobbies & Interests
              </span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {hobbies.map((hobby, index) => (
                <motion.div
                  key={hobby.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                  whileHover={{ scale: 1.05, rotateY: 10 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${hobby.color} rounded-xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity`} />
                  <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20">
                    <motion.div
                      className={`w-16 h-16 bg-gradient-to-r ${hobby.color} rounded-2xl flex items-center justify-center mb-4 mx-auto`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {hobby.icon}
                    </motion.div>
                    <h4 className="text-lg font-semibold text-center mb-2">{hobby.name}</h4>
                    <p className="text-sm text-gray-400 text-center">
                      {hobby.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}