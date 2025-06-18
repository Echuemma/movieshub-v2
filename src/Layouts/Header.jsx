import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import ThemeToggle from "../components/ThemeToggle";

export default function Header() {
  const [isClick, setisClick] = useState(false);
  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setisClick(false); 
    }
  };

  return (
    <motion.nav
      className="dark:from-gray-900 dark:to-gray-800 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white shadow-md p-4 flex justify-between items-center md:sticky top-0 z-10000 relative max-w-[1920px] mx-auto w-full lg:px-20 sm:px-10 px-5 md:px-13"
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <NavLink
        to="/"
        className="text-2xl font-extrabold text-red-500 tracking-wide"
      >
        MoviesHub
      </NavLink>
      <div className="items-center flex gap-7">
        <div
          className={`md:space-x-6  text-lg font-medium top-16  flex flex-col gap-4 absolute  justify-center items-center w-full bg-gray-100 dark:bg-gray-800 overflow-hidden  ${
            isClick ? "h-50" : "h-0"
          } left-0 md:bg-transparent md:flex-row md:static md:top-0 md:gap-0 md:items-center md:w-auto transition-all md:h-auto duration-400 ease-in-out`}
        >
          <AnimatedLink
            to="/"
            label="Home"
            color="blue"
            onClick={() => setisClick(false)}
          />
          <AnimatedButton
            label="Featured"
            color="purple"
            onClick={() => scrollToSection('featured-section')}
          />
          <AnimatedButton
            label="Trending"
            color="orange" 
            onClick={() => scrollToSection('trending-section')}
          />
          <AnimatedButton
            label="Categories"
            color="teal"
            onClick={() => scrollToSection('categories-section')}
          />
          <AnimatedButton
            label="About"
            color="indigo"
            onClick={() => scrollToSection('about-section')}
          />
        </div>
        
        {/* Authentication Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <NavLink
            to="/login"
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            Sign Up
          </NavLink>
        </div>
        
        <ThemeToggle />
      </div>

      <div className="md:hidden flex items-center">
        <button
          className="text-gray-600 dark:text-gray-300 focus:outline-none"
          onClick={() => setisClick(!isClick)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
      
      {isClick && (
        <div className="md:hidden absolute top-full left-0 w-full bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 flex gap-3 justify-center">
          <NavLink
            to="/login"
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            onClick={() => setisClick(false)}
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 shadow-sm hover:shadow-md"
            onClick={() => setisClick(false)}
          >
            Sign Up
          </NavLink>
        </div>
      )}
    </motion.nav>
  );
}

const AnimatedLink = ({ to, label, color, onClick }) => {
  const baseColors = {
    blue: {
      text: "text-blue-600",
      hover: "hover:text-blue-700",
      underline: "after:bg-blue-500",
      active: "text-blue-700",
    },
    pink: {
      text: "text-pink-600",
      hover: "hover:text-pink-700",
      underline: "after:bg-pink-500",
      active: "text-pink-700",
    },
    green: {
      text: "text-green-600",
      hover: "hover:text-green-700",
      underline: "after:bg-green-500",
      active: "text-green-700",
    },
  };

  const styles = baseColors[color] || baseColors.blue;

  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        [
          "relative transition-colors duration-200 after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-[2px] after:transition-all after:duration-300",
          styles.hover,
          isActive ? styles.active + " font-semibold" : "",
        ].join(" ")
      }
    >
      {label}
    </NavLink>
  );
};

const AnimatedButton = ({ label, color, onClick }) => {
  const baseColors = {
    blue: { hover: "hover:text-blue-700", underline: "after:bg-blue-500" },
    pink: { hover: "hover:text-pink-700", underline: "after:bg-pink-500" },
    green: { hover: "hover:text-green-700", underline: "after:bg-green-500" },
    purple: { hover: "hover:text-purple-700", underline: "after:bg-purple-500" },
    orange: { hover: "hover:text-orange-700", underline: "after:bg-orange-500" },
    teal: { hover: "hover:text-teal-700", underline: "after:bg-teal-500" },
    indigo: { hover: "hover:text-indigo-700", underline: "after:bg-indigo-500" },
  };

  const styles = baseColors[color] || baseColors.blue;

  return (
    <button
      onClick={onClick}
      className={`relative transition-colors duration-200 after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-[2px] ${styles.underline} after:transition-all after:duration-300 ${styles.hover} cursor-pointer`}
    >
      {label}
    </button>
  );
};