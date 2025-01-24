import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send } from 'lucide-react';
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

  const validateForm = () => {
    const newErrors = {};
    if (!formState.name.trim()) newErrors.name = 'Name is required';
    if (!formState.email.trim()) newErrors.email = ' Email is required';
    else if (!/\S+@\S+\.\S+/.test(formState.email)) newErrors.email = 'Invalid email format';
    if (!formState.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-blue-900 via-black to-purple-900 relative overflow-hidden">
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-10"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
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

          <div className="bg-black bg-opacity-50 rounded-xl p-8 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative"
                >
                  <input
                    type="text"
                    placeholder="Name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className={`w-full px-4 py-3 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                      errors.name ? 'ring-2 ring-red-500' : ''
                    }`}
                  />
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative"
                >
                  <input
                    type="email"
                    placeholder="Email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className={`w-full px-4 py-3 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                      errors.email ? 'ring-2 ring-red-500' : ''
                    }`}
                  />
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </motion.div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                <textarea
                  placeholder="Message"
                  rows={6}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className={`w-full px-4 py-3 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                    errors.message ? 'ring-2 ring-red-500' : ''
                  }`}
                />
                {errors.message && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.message}
                  </motion.p>
                )}
              </motion.div>

              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSubmitting}
              >
                <motion.div
                  className="absolute inset-0 bg-white opacity-20"
                  initial={{ x: "-100%" }}
                  animate={isSubmitting ? { x: "100%" } : { x: "-100%" }}
                  transition={{ duration: 1, repeat: isSubmitting ? Infinity : 0 }}
                />
                <Send className="w-5 h-5" />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.a
                href="mailto:contact@example.com"
                className="flex items-center gap-4 text-white p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors group"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Mail className="w-6 h-6" />
                </motion.div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-gray-400">contact@example.com</p>
                </div>
              </motion.a>

              <motion.div
                className="flex items-center gap-4 text-white p-4 bg-gray-900 rounded-lg group"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <MessageSquare className="w-6 h-6" />
                </motion.div>
                <div>
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