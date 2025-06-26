import { useEffect, useState, useCallback } from "react";
import { fetchTopAnime, searchAnime } from "../Apis/fetchAnime";
import MediaCard from "../components/MediaCard";
import SearchBar from "../components/SearchBar";
import LogoutButton from "../components/LogoutButton";
import Loader from "./Loader";

export default function Anime() {
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width < 640) { 
        setItemsPerPage(8);
      } else if (width < 1024) { 
        setItemsPerPage(12);
      } else { 
        setItemsPerPage(18);
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  useEffect(() => {
    const loadTopAnime = async () => {
      try {
        setLoading(true);
        setError(null);
        const topAnime = await fetchTopAnime();
        setAnime(topAnime);
        setCurrentPage(1); 
      } catch (err) {
        setError("Failed to load top anime. Please try again.");
        console.error("Error fetching top anime:", err);
      } finally {
        setLoading(false);
      }
    };

    loadTopAnime();
  }, []);

  const handleSearch = useCallback(async (query) => {
    const trimmedQuery = query.trim();
    setSearchQuery(trimmedQuery);
    setNoResults(false);
    setError(null);
    setCurrentPage(1); 

    if (trimmedQuery === "") {
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

  const totalPages = Math.ceil(anime.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAnime = anime.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  if (loading) {
    return (
      <div className="px-4 py-4 bg-gray-100 dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <SearchBar onSearch={() => { }} placeholder="Search anime..." disabled />
          </div>
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-4 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {searchQuery ? `Results for "${searchQuery}"` : "Top Anime"}
          </h1>
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search anime..."
            disabled={searchLoading}
          />
          <LogoutButton variant="default" />
        </div>

        {!searchLoading && !error && anime.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing {startIndex + 1}-{Math.min(endIndex, anime.length)} of {anime.length} anime
            </div>

            <div className="hidden sm:flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded text-sm ${viewMode === 'grid'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded text-sm ${viewMode === 'list'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
              >
                List
              </button>
            </div>
          </div>
        )}

        {searchLoading && (
          <div className="flex justify-center items-center py-8">
            <Loader />
          </div>
        )}

        {error && !searchLoading && (
          <div className="text-center py-8">
            <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg inline-block">
              <p className="font-medium">Error</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {noResults && !searchLoading && (
          <div className="text-center py-8">
            <div className="text-gray-500 dark:text-gray-400">
              <svg className="mx-auto h-10 w-10 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-lg font-medium mb-2">No anime found</h3>
              <p className="text-sm">Try different keywords</p>
            </div>
          </div>
        )}

        {!searchLoading && !error && currentAnime.length > 0 && (
          <>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
                {currentAnime.map((item) => (
                  <div key={item.mal_id} className="w-full min-w-0">
                    <MediaCard
                      id={item.mal_id}
                      title={item.title}
                      image={item.images?.jpg?.image_url || item.images?.webp?.image_url || null}
                      rating={item.score ? item.score.toFixed(1) : "N/A"}
                      type="anime"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {currentAnime.map((item) => (
                  <div key={item.mal_id} className="flex items-center space-x-3 bg-white dark:bg-gray-800 p-3 rounded-lg shadow">
                    <img
                      src={item.images?.jpg?.image_url || item.images?.webp?.image_url || null}
                      alt={item.title}
                      className="w-16 h-20 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 dark:text-white truncate">{item.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">⭐ {item.score ? item.score.toFixed(1) : "N/A"}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-8 flex flex-col items-center space-y-4">
                <div className="sm:hidden">
                  {currentPage < totalPages && (
                    <button
                      onClick={handleLoadMore}
                      className="w-full px-6 py-3 bg-red-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                    >
                      Load More ({anime.length - endIndex} remaining)
                    </button>
                  )}
                </div>

                <div className="hidden sm:flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="text-gray-800 dark:text-white px-3 py-2 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
                    if (pageNum > totalPages) return null;

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3 py-2 rounded ${currentPage === pageNum
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                          }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="text-gray-800 dark:text-white px-3 py-2 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>

                {/* Page Info */}
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Page {currentPage} of {totalPages}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}