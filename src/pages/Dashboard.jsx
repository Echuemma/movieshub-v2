import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white text-center">
            Welcome to MoviesHub!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-12">
            Choose your entertainment destination
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <NavCard 
            to="/movies" 
            title="Movies" 
            icon="🎬" 
            description="Browse latest movies and blockbusters"
            color="blue"
            delay={0.1}
          />
          <NavCard 
            to="/anime" 
            title="Anime" 
            icon="🎌" 
            description="Discover anime series and films"
            color="pink"
            delay={0.2}
          />
          <NavCard 
            to="/favorites" 
            title="Favorites" 
            icon="❤️" 
            description="Your saved and favorite content"
            color="green"
            delay={0.3}
          />
        </div>
      </div>
    </div>
  );
};

const NavCard = ({ to, title, icon, description, color, delay }) => {
  const colorClasses = {
    blue: {
      border: "border-blue-200 dark:border-blue-800",
      hover: "hover:border-blue-400 dark:hover:border-blue-600",
      bg: "hover:bg-blue-50 dark:hover:bg-blue-900/20",
      text: "text-blue-600 dark:text-blue-400",
      shadow: "hover:shadow-blue-200/50 dark:hover:shadow-blue-900/50"
    },
    pink: {
      border: "border-pink-200 dark:border-pink-800",
      hover: "hover:border-pink-400 dark:hover:border-pink-600",
      bg: "hover:bg-pink-50 dark:hover:bg-pink-900/20",
      text: "text-pink-600 dark:text-pink-400",
      shadow: "hover:shadow-pink-200/50 dark:hover:shadow-pink-900/50"
    },
    green: {
      border: "border-green-200 dark:border-green-800",
      hover: "hover:border-green-400 dark:hover:border-green-600",
      bg: "hover:bg-green-50 dark:hover:bg-green-900/20",
      text: "text-green-600 dark:text-green-400",
      shadow: "hover:shadow-green-200/50 dark:hover:shadow-green-900/50"
    }
  };

  const styles = colorClasses[color] || colorClasses.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <NavLink
        to={to}
        className={`block p-8 bg-white dark:bg-gray-800 rounded-xl border-2 ${styles.border} ${styles.hover} ${styles.bg} transition-all duration-300 hover:shadow-xl ${styles.shadow} group`}
      >
        <div className="text-center">
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <h3 className={`text-2xl font-bold mb-3 ${styles.text} group-hover:text-opacity-80 transition-colors duration-300`}>
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
            {description}
          </p>
        </div>
      </NavLink>
    </motion.div>
  );
};

export default Dashboard;