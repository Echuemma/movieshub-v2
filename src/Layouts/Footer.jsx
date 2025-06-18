import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut'
      }
    },
    hover: {
      scale: 1.1,
      y: -2,
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <motion.footer
      className="w-full py-8 bg-gray-200 dark:bg-gray-900 text-center text-gray-700 dark:text-gray-300 text-sm select-none border-t border-gray-300 dark:border-gray-700"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="flex justify-center gap-8 mb-4"
        variants={itemVariants}
      >
        {[
          { href: "https://github.com/your-username", icon: Github, label: "GitHub" },
          { href: "https://linkedin.com/in/your-username", icon: Linkedin, label: "LinkedIn" },
          { href: "https://twitter.com/your-username", icon: Twitter, label: "Twitter" }
        ].map(({ href, icon: Icon, label }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700"
            variants={iconVariants}
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
            aria-label={label}
          >
            <Icon size={22} />
          </motion.a>
        ))}
      </motion.div>
      
      <motion.div
        variants={itemVariants}
        className="border-t border-gray-300 dark:border-gray-700 pt-4"
      >
        <motion.p
          className="text-gray-500 dark:text-gray-400 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          © {new Date().getFullYear()} MoviesHub. All rights reserved.
        </motion.p>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;