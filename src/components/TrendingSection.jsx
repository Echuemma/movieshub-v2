import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TrendingSection = () => {
  const [visibleCards, setVisibleCards] = useState(new Set());

  const movies = [
    {
      id: 1,
      title: "Quantum Strike",
      year: "2019",
      rating: 8.7,
      genres: ["Action", "Sci-Fi"],
      image: "https://images.unsplash.com/photo-1489599162853-0ef1f7966a07?w=400&h=600&fit=crop",
      trendingText: "🔥 Hot",
      rank: 1
    },
    {
      id: 2,
      title: "The Last Symphony",
      year: "2024",
      rating: 9.1,
      genres: ["Drama", "Romance"],
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=600&fit=crop",
      trendingText: "📈 Rising",
      rank: 2
    },
    {
      id: 3,
      title: "Midnight Echoes",
      year: "2016",
      rating: 7.9,
      genres: ["Horror", "Thriller"],
      image: "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=400&h=600&fit=crop",
      trendingText: "👻 Viral",
      rank: 3
    },
    {
      id: 4,
      title: "Summer Chaos",
      year: "2025",
      rating: 8.3,
      genres: ["Comedy", "Adventure"],
      image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
      trendingText: "😂 Viral",
      rank: 4
    },
    {
      id: 5,
      title: "Realm of Shadows",
      year: "2022",
      rating: 8.8,
      genres: ["Fantasy", "Epic"],
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
      trendingText: "⚡ New",
      rank: 5
    },
    {
      id: 6,
      title: "Cosmic Horizons",
      year: "2024",
      rating: 8.5,
      genres: ["Sci-Fi", "Adventure"],
      image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop",
      trendingText: "🚀 Trending",
      rank: 6
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const movieId = parseInt(entry.target.dataset.movieId);
            setVisibleCards(prev => new Set([...prev, movieId]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const cards = document.querySelectorAll('[data-movie-id]');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const handleMovieClick = (movieId) => {
    console.log(`Opening movie ${movieId}`);
    // Add your navigation logic here
  };

  const handleViewAll = () => {
    console.log('Viewing all trending movies');
    // Add your navigation logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-blue-900">
      <section className="px-4 py-16 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h4 className="text-4xl sm:text-2xl lg:text-3xl font-extrabold mb-4 bg-gradient-to-r from-pink-500 via-teal-400 to-blue-500 bg-clip-text text-transparent animate-pulse bg-[length:300%_300%]">
            <span className="block animate-[gradient-shift_4s_ease-in-out_infinite] bg-gradient-to-r from-pink-500 via-teal-400 to-blue-500 bg-clip-text text-transparent tracking-wider">
              TRENDING NOW
            </span>
          </h4>
          <p className="text-lg text-gray-300 font-light max-w-2xl mx-auto">
            Discover what everyone's watching this week
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              data-movie-id={movie.id}
              onClick={() => handleMovieClick(movie.id)}
              className={`group relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-translate-y-3 hover:rotate-x-1 hover:shadow-2xl hover:shadow-pink-500/20 ${
                visibleCards.has(movie.id) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 z-10" />
              
              {/* Movie Poster */}
              <div className="relative h-96 overflow-hidden">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Rank Badge */}
                <div className="absolute top-4 left-4 w-12 h-12 bg-red-500  from-pink-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-pink-500/30 z-20">
                  {movie.rank}
                </div>
                
                {/* Trending Indicator */}
                <div className="absolute top-4 right-4 bg-teal-400/90 text-black px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide animate-pulse z-20">
                  {movie.trendingText}
                </div>
              </div>

              {/* Movie Info */}
              <div className="p-6 relative z-20">
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-teal-400 transition-colors">
                  {movie.title}
                </h3>
                
                {/* Meta Info */}
                <div className="flex justify-between items-center mb-4 text-gray-400">
                  <span className="text-sm">{movie.year}</span>
                  <div className="flex items-center gap-1 bg-yellow-400/10 px-2 py-1 rounded-lg border border-yellow-400/30">
                    <span className="text-yellow-400 text-sm">★</span>
                    <span className="text-sm font-medium text-yellow-400">{movie.rating}</span>
                  </div>
                </div>
                
                {/* Genre Tags */}
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre}
                      className="px-3 py-1 bg-blue-400/20 text-teal-400 text-xs rounded-full border border-teal-400/30 transition-all group-hover:bg-teal-400/30 group-hover:scale-105"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to='./login'>
                <button
          
            onClick={handleViewAll}
            className=" bg-red-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"

            // className="relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-semibold rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/30 group overflow-hidden"
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="relative uppercase tracking-wide text-sm">
              View All Trending Movies
            </span>
          </button>
          </Link>
      
        </div>
      </section>

      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-gradient-shift {
          background-size: 300% 300%;
          animation: gradient-shift 4s ease-in-out infinite;
        }
        
        .rotate-x-1 {
          transform: rotateX(2deg);
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default TrendingSection;