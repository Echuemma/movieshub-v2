import { useEffect, useState, useCallback } from "react";
import { fetchTopAnime, searchAnime } from "../Apis/fetchAnime";
import MediaCard from "../components/MediaCard";
import SearchBar from "../components/SearchBar";
import Loader from "./Loader";

export default function Anime() {
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  // Load top anime on component mount
  useEffect(() => {
    const loadTopAnime = async () => {
      try {
        setLoading(true);
        setError(null);
        const topAnime = await fetchTopAnime();
        setAnime(topAnime);
      } catch (err) {
        setError("Failed to load top anime. Please try again.");
        console.error("Error fetching top anime:", err);
      } finally {
        setLoading(false);
      }
    };

    loadTopAnime();
  }, []);

  // Optimized search handler with proper error handling
  const handleSearch = useCallback(async (query) => {
    const trimmedQuery = query.trim();
    setSearchQuery(trimmedQuery);
    setNoResults(false);
    setError(null);

    if (trimmedQuery === "") {
      // Reset to top anime when search is cleared
      try {
        setSearchLoading(true);
        const topAnime = await fetchTopAnime();
        setAnime(topAnime);
      } catch (err) {
        setError("Failed to load top anime. Please try again.");
        console.error("Error fetching top anime:", err);
      } finally {
        setSearchLoading(false);
      }
      return;
    }

    try {
      setSearchLoading(true);
      const results = await searchAnime(trimmedQuery);
      
      if (results.length === 0) {
        setNoResults(true);
        setAnime([]);
      } else {
        setAnime(results);
        setNoResults(false);
      }
    } catch (err) {
      setError("Search failed. Please try again.");
      console.error("Error searching anime:", err);
    } finally {
      setSearchLoading(false);
    }
  }, []);

  // Show initial loading state
  if (loading) {
    return (
      <div className="px-4 py-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <SearchBar onSearch={() => {}} placeholder="Search anime..." disabled />
          </div>
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {searchQuery ? `Search Results for "${searchQuery}"` : "Top Anime"}
          </h1>
          <SearchBar 
            onSearch={handleSearch} 
            placeholder="Search anime..." 
            disabled={searchLoading}
          />
        </div>

        {/* Loading State for Search */}
        {searchLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader />
          </div>
        )}

        {/* Error State */}
        {error && !searchLoading && (
          <div className="text-center py-12">
            <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-6 py-4 rounded-lg inline-block">
              <p className="font-medium">Error</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* No Results State */}
        {noResults && !searchLoading && (
          <div className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400">
              <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-lg font-medium mb-2">No anime found</h3>
              <p className="text-sm">Try searching with different keywords</p>
            </div>
          </div>
        )}

        {/* Anime Grid */}
        {!searchLoading && !error && anime.length > 0 && (
          <>
            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Showing {anime.length} anime {anime.length !== 1 ? 'series' : 'series'}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
              {anime.map((item) => (
                <MediaCard
                  key={item.mal_id}
                  id={item.mal_id}
                  title={item.title}
                  image={item.images?.jpg?.image_url || item.images?.webp?.image_url || null}
                  rating={item.score ? item.score.toFixed(1) : "N/A"}
                  type="anime"
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}