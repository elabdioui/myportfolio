import { motion, useAnimation } from 'framer-motion';
import { Mail, MessageSquare, Send, CheckCircle, AlertCircle, Phone, MapPin, Calendar, Linkedin, Github, User } from 'lucide-react';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

export function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const controls = useAnimation();

  const validateForm = () => {
    const newErrors = {};
    if (!formState.name.trim()) newErrors.name = 'Name is required';
    if (!formState.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formState.email)) newErrors.email = 'Invalid email format';
    if (!formState.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formState.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      controls.start({
        x: [-10, 10, -10, 10, 0],
        transition: { duration: 0.5 }
      });
      return;
    }

    setIsSubmitting(true);
    
    // Create mailto link with form data
    const subject = encodeURIComponent(formState.subject);
    const body = encodeURIComponent(
      `Hello Haitham,\n\nName: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}\n\nBest regards,\n${formState.name}`
    );
    const mailtoLink = `mailto:elabdiouihaitham@gmail.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitStatus('success');
    
    // Reset form after success
    setTimeout(() => {
      setFormState({ name: '', email: '', subject: '', message: '' });
      setSubmitStatus(null);
    }, 3000);
  };

  const handleFieldFocus = (field) => {
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: "elabdiouihaitham@gmail.com",
      description: "Send me an email for professional inquiries",
      href: "mailto:elabdiouihaitham@gmail.com",
      color: "from-blue-500 to-cyan-500",
      hoverColor: "hover:from-blue-600 hover:to-cyan-600"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Discord",
      value: "haitham1620",
      description: "Connect with me on Discord for quick chats",
      href: "https://discord.com/users/haitham1620",
      color: "from-purple-500 to-indigo-500",
      hoverColor: "hover:from-purple-600 hover:to-indigo-600"
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      title: "LinkedIn",
      value: "Haitham El Abdioui",
      description: "Connect professionally on LinkedIn",
      href: "https://www.linkedin.com/in/haithamelabdioui/",
      color: "from-blue-600 to-blue-700",
      hoverColor: "hover:from-blue-700 hover:to-blue-800"
    },
    {
      icon: <Github className="w-6 h-6" />,
      title: "GitHub",
      value: "elabdioui",
      description: "Check out my code repositories",
      href: "https://github.com/elabdioui",
      color: "from-gray-600 to-gray-700",
      hoverColor: "hover:from-gray-700 hover:to-gray-800"
    }
  ];

  const personalInfo = [
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Location",
      value: "Casablanca, Morocco"
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: "Availability",
      value: "Available for Internship - July 2025"
    },
    {
      icon: <User className="w-5 h-5" />,
      label: "Status",
      value: "Software Engineering Student"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-[#0B1120] relative overflow-hidden">
      {/* Animated stars background */}
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
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Let's Connect
              </span>
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Ready to collaborate on exciting projects or discuss opportunities? 
              I'm always open to connecting with fellow developers, potential employers, and innovative minds.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Send className="w-6 h-6 text-blue-400" />
                  Send me a message
                </h3>
                
                <motion.form 
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                  animate={controls}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Input */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="relative group"
                    >
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity" />
                      <input
                        type="text"
                        placeholder="Your full name"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        onFocus={() => handleFieldFocus('name')}
                        className={`w-full px-4 py-3 bg-gray-800/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all relative z-10 border ${
                          errors.name ? 'border-red-500 ring-2 ring-red-500' : 'border-white/10'
                        }`}
                      />
                      {errors.name && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 text-red-400 text-sm mt-2"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {errors.name}
                        </motion.div>
                      )}
                    </motion.div>

                    {/* Email Input */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="relative group"
                    >
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity" />
                      <input
                        type="email"
                        placeholder="your.email@example.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        onFocus={() => handleFieldFocus('email')}
                        className={`w-full px-4 py-3 bg-gray-800/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all relative z-10 border ${
                          errors.email ? 'border-red-500 ring-2 ring-red-500' : 'border-white/10'
                        }`}
                      />
                      {errors.email && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 text-red-400 text-sm mt-2"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {errors.email}
                        </motion.div>
                      )}
                    </motion.div>
                  </div>

                  {/* Subject Input */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative group"
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Subject *
                    </label>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity" />
                    <input
                      type="text"
                      placeholder="What's this about?"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      onFocus={() => handleFieldFocus('subject')}
                      className={`w-full px-4 py-3 bg-gray-800/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all relative z-10 border ${
                        errors.subject ? 'border-red-500 ring-2 ring-red-500' : 'border-white/10'
                      }`}
                    />
                    {errors.subject && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-red-400 text-sm mt-2"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.subject}
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Message Input */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative group"
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Message *
                    </label>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity" />
                    <textarea
                      placeholder="Tell me about your project, opportunity, or just say hello..."
                      rows={6}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      onFocus={() => handleFieldFocus('message')}
                      className={`w-full px-4 py-3 bg-gray-800/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all relative z-10 border resize-none ${
                        errors.message ? 'border-red-500 ring-2 ring-red-500' : 'border-white/10'
                      }`}
                    />
                    {errors.message && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-red-400 text-sm mt-2"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.message}
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-xl font-medium relative overflow-hidden group disabled:opacity-70 shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/50 to-blue-500/50"
                      initial={{ x: "100%" }}
                      animate={isSubmitting ? { x: "-100%" } : { x: "100%" }}
                      transition={{ duration: 1, repeat: isSubmitting ? Infinity : 0 }}
                    />
                    <div className="relative flex items-center justify-center gap-2">
                      {submitStatus === 'success' ? (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          Email Client Opened!
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          {isSubmitting ? 'Opening Email Client...' : 'Send Message'}
                        </>
                      )}
                    </div>
                  </motion.button>
                </motion.form>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {/* Personal Info */}
              <div className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-6">Personal Information</h3>
                <div className="space-y-4">
                  {personalInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3 text-gray-300"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                    >
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        {info.icon}
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{info.label}</p>
                        <p className="font-medium">{info.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Contact Methods */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Get in Touch</h3>
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={index}
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block p-4 bg-gray-900/30 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all group ${method.hoverColor}`}
                    whileHover={{ scale: 1.02, y: -2 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                  >
                    <div className="flex items-center gap-4">
                      <motion.div
                        className={`p-3 bg-gradient-to-r ${method.color} rounded-xl text-white`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        {method.icon}
                      </motion.div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                          {method.title}
                        </h4>
                        <p className="text-gray-300 text-sm font-medium">{method.value}</p>
                        <p className="text-gray-400 text-xs">{method.description}</p>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Quick Response Promise */}
              <motion.div
                className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-400/20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.6 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <h4 className="font-semibold text-white">Quick Response Guarantee</h4>
                </div>
                <p className="text-gray-300 text-sm">
                  I typically respond to emails within 24 hours and Discord messages within a few hours during business days.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}