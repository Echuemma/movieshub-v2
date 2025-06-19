import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useFavorites from '../hooks/useFavorites'; 
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function MediaCard({ id, title, image, rating, type }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [fav, setFav] = useState(false);

  useEffect(() => {
    setFav(isFavorite(id));
  }, [id]);

  const toggleFavorite = (e) => {
    e.preventDefault();
    const item = { id, title, image, rating, type };
    fav ? removeFavorite(id) : addFavorite(item);
    setFav(!fav);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className="relative w-full max-w-xs mx-auto"
    >
      <Link to={`/${type}s/${id}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg"
        >
          {/* Fixed aspect ratio container for image */}
          <div className="relative w-full aspect-[3/4] overflow-hidden">
            <motion.img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          {/* Fixed height content area */}
          <div className="p-4 h-20 flex flex-col justify-between">
            <h2 className="text-sm font-bold text-gray-800 dark:text-white line-clamp-1 leading-tight">
              {title}
            </h2>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">⭐ {rating}</p>
          </div>
        </motion.div>
      </Link>

      <motion.button
        onClick={toggleFavorite}
        whileTap={{ scale: 1.3 }}
        whileHover={{ scale: 1.2 }}
        className="absolute top-2 right-2 text-red-500 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md z-10"
        title={fav ? 'Remove from Favorites' : 'Add to Favorites'}
      >
        {fav ? <FaHeart size={16} /> : <FaRegHeart size={16} />}
      </motion.button>
    </motion.div>
  );
}