import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { 
  addToFavorites, 
  removeFromFavorites 
} from '../store/favoritesSlice'; // Adjust this import based on your store structure

const useFavorites = () => {
  const dispatch = useDispatch();
  
  // Safely access favorites from state with fallback
  const favorites = useSelector((state) => {
    // Debug log to see what the state looks like
    console.log('Full state:', state);
    console.log('Favorites state:', state.favorites);
    return state.favorites?.items || [];
  });

  const addFavorite = useCallback(
    (item) => dispatch(addToFavorites(item)),
    [dispatch]
  );

  const removeFavorite = useCallback(
    (id) => dispatch(removeFromFavorites(id)),
    [dispatch]
  );

  const isFavorite = useCallback(
    (id) => favorites.some(item => item.id === id),
    [favorites]
  );

  const getFavoriteCount = useCallback(
    () => favorites.length,
    [favorites]
  );

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    getFavoriteCount,
  };
};

export default useFavorites;