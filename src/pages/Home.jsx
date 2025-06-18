import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import MovieFeaturesSection from '../components/MovieFeaturesSection';
import TrendingSection from '../components/TrendingSection';
import AboutUsSection from '../components/AboutUsSection';

export default function Home() {
  const navigate = useNavigate();
  
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <div className="w-full max-w-[1920px] mx-auto overflow-hidden">
      <motion.div
        className="relative w-full flex flex-col items-center justify-center min-h-screen gap-10 text-white px-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="absolute inset-0 w-full h-full z-0">
          <img
            src="/bg.jpg"
            alt="Netflix Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        </div>
        <motion.h1
          className="text-5xl z-10 font-extrabold text-center tracking-wide"
          animate={{
            scale: [1, 1.05, 1],
            textShadow: [
              '0 0 0 rgba(0,0,0,0)',
              '0 0 8px rgba(255,255,255,0.6)',
              '0 0 0 rgba(0,0,0,0)',
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
        >
          Welcome to <span className="text-red-500">MoviesHub</span>
        </motion.h1>

        <div className="flex gap-8 z-10">
          <button
            data-aos="fade-down"
            data-aos-duration="1000"
            data-aos-delay="700"
            onClick={() => navigate('/register')}
            className="bg-blue-600 cursor-pointer text-white py-4 px-10 rounded-3xl text-2xl font-semibold shadow-lg hover:scale-110 hover:bg-blue-700 hover:shadow-xl transition-all duration-300 ease-out transform active:scale-95"
            style={{
              boxShadow: '0 4px 15px rgba(37,99,235,0.3)',
            }}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = '0 8px 25px rgba(37,99,235,0.6)';
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = '0 4px 15px rgba(37,99,235,0.3)';
            }}
          >
            Sign Up
          </button>

          <button
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="700"
            className="bg-pink-600 cursor-pointer text-white py-4 px-10 rounded-3xl text-2xl font-semibold shadow-lg hover:scale-110 hover:bg-pink-700 hover:shadow-xl transition-all duration-300 ease-out transform active:scale-95"
            onClick={() => navigate('/login')}
            style={{
              boxShadow: '0 4px 15px rgba(219,39,119,0.3)',
            }}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = '0 8px 25px rgba(219,39,119,0.6)';
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = '0 4px 15px rgba(219,39,119,0.3)';
            }}
          >
            Login
          </button>
        </div>
      </motion.div>
      
      {/* Add IDs to each section */}
      <div id="featured-section">
        <MovieFeaturesSection />
      </div>
      
      <div id="trending-section">
        <TrendingSection />
      </div>
      
      <div 
      // id="categories-section"
      >
        {/* Add your categories component here when you create it */}
      </div>
      
      <div id="about-section">
        <AboutUsSection />
      </div>
    </div>
  );
}