import { useEffect, useState, useCallback } from "react";
import { fetchPopularMovies, searchMovies } from "../Apis/fetchMovies";
import MediaCard from "../components/MediaCard";
import SearchBar from "../components/SearchBar";
import Loader from "./Loader";
import { useNavigation } from "react-router-dom";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const navigation = useNavigation();
  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const popularMovies = await fetchPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        setError("Failed to load popular movies. Please try again.");
        console.error("Error fetching popular movies:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);
  const handleSearch = useCallback(async (query) => {
    const trimmedQuery = query.trim();
    setSearchQuery(trimmedQuery);
    setNoResults(false);
    setError(null);

    if (trimmedQuery === "") {
      try {
        setSearchLoading(true);
        const popularMovies = await fetchPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        setError("Failed to load popular movies. Please try again.");
        console.error("Error fetching popular movies:", err);
      } finally {
        setSearchLoading(false);
      }
      return;
    }

    try {
      setSearchLoading(true);
      const results = await searchMovies(trimmedQuery);
      
      if (results.length === 0) {
        setNoResults(true);
        setMovies([]);
      } else {
        setMovies(results);
        setNoResults(false);
      }
    } catch (err) {
      setError("Search failed. Please try again.");
      console.error("Error searching movies:", err);
    } finally {
      setSearchLoading(false);
    }
  }, []);
  if (loading || navigation.state === "loading") {
    return (
      <div className="px-4 py-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <SearchBar onSearch={() => {}} placeholder="Search movies..." disabled />
          </div>
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {searchQuery ? `Search Results for "${searchQuery}"` : "Popular Movies"}
          </h1>
          <SearchBar 
            onSearch={handleSearch} 
            placeholder="Search movies..." 
            disabled={searchLoading}
          />
        </div>

        {/* Loading State for Search */}
        {searchLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader />
          </div>
        )}
        {error && !searchLoading && (
          <div className="text-center py-12">
            <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-6 py-4 rounded-lg inline-block">
              <p className="font-medium">Error</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {noResults && !searchLoading && (
          <div className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400">
              <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-lg font-medium mb-2">No movies found</h3>
              <p className="text-sm">Try searching with different keywords</p>
            </div>
          </div>
        )}
        {!searchLoading && !error && movies.length > 0 && (
          <>
            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Showing {movies.length} movie{movies.length !== 1 ? 's' : ''}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
              {movies.map((movie) => (
                <MediaCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  image={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null}
                  rating={movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                  type="movie"
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}