import { motion, useAnimation } from 'framer-motion';
import { Mail, MessageSquare, Send, CheckCircle, AlertCircle } from 'lucide-react';
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
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitStatus('success');
    
    // Reset form after success
    setTimeout(() => {
      setFormState({ name: '', email: '', message: '' });
      setSubmitStatus(null);
    }, 3000);
  };

  const handleFieldFocus = (field) => {
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

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
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-12 text-center text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Get in Touch
            </span>
          </h2>

          <div className="bg-black/50 rounded-xl p-8 backdrop-blur-lg border border-white/10">
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
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity" />
                  <input
                    type="text"
                    placeholder="Name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    onFocus={() => handleFieldFocus('name')}
                    className={`w-full px-4 py-3 bg-gray-900/80 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all relative z-10 ${
                      errors.name ? 'ring-2 ring-red-500' : ''
                    }`}
                  />
                  {errors.name && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-red-500 text-sm mt-1"
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
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity" />
                  <input
                    type="email"
                    placeholder="Email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    onFocus={() => handleFieldFocus('email')}
                    className={`w-full px-4 py-3 bg-gray-900/80 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all relative z-10 ${
                      errors.email ? 'ring-2 ring-red-500' : ''
                    }`}
                  />
                  {errors.email && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-red-500 text-sm mt-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </motion.div>
                  )}
                </motion.div>
              </div>

              {/* Message Input */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity" />
                <textarea
                  placeholder="Your message..."
                  rows={6}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  onFocus={() => handleFieldFocus('message')}
                  className={`w-full px-4 py-3 bg-gray-900/80 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all relative z-10 ${
                    errors.message ? 'ring-2 ring-red-500' : ''
                  }`}
                />
                {errors.message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-red-500 text-sm mt-1"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {errors.message}
                  </motion.div>
                )}
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-lg font-medium relative overflow-hidden group disabled:opacity-70"
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
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </>
                  )}
                </div>
              </motion.button>
            </motion.form>

            {/* Contact Info */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.a
                href="mailto:contact@example.com"
                className="flex items-center gap-4 text-white p-6 bg-gray-900/50 rounded-lg hover:bg-gray-800/50 transition-colors group relative overflow-hidden"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <motion.div
                  className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center relative"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Mail className="w-6 h-6" />
                </motion.div>
                <div className="relative">
                  <h3 className="font-medium">Email</h3>
                  <p className="text-gray-400">contact@example.com</p>
                </div>
              </motion.a>

              <motion.div
                className="flex items-center gap-4 text-white p-6 bg-gray-900/50 rounded-lg group relative overflow-hidden"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <motion.div
                  className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center relative"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <MessageSquare className="w-6 h-6" />
                </motion.div>
                <div className="relative">
                  <h3 className="font-medium">Discord</h3>
                  <p className="text-gray-400">@johndoe</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}