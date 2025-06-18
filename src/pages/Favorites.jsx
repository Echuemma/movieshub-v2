import React from 'react';
import useFavorites from '../hooks/useFavorites';
import MediaCard from '../components/MediaCard';

const Favorites = () => {
  const { favorites } = useFavorites();
  if (!favorites) {
    return <div>Loading favorites...</div>;
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-600 dark:text-gray-300">
          No favorites yet
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Add some movies or anime to your favorites!
        </p>
      </div>
    );
  }

  return (
    <div className="container text-center mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        Your Favorites ({favorites.length})
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {favorites.map((item) => (
          <MediaCard
            key={item.id}
            id={item.id}
            title={item.title}
            image={item.image}
            rating={item.rating}
            type={item.type}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;