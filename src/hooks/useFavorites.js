import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { 
  addToFavorites, 
  removeFromFavorites,
  clearFavorites 
} from '../store/favoritesSlice'; 

const useFavorites = () => {
  const dispatch = useDispatch();
  
  const favorites = useSelector((state) => {
    return state.favorites?.items || [];
  });

  const addFavorite = useCallback(
    (item) => {
      if (!item || !item.id) {
        console.warn('Cannot add favorite: item must have an id');
        return;
      }
      dispatch(addToFavorites(item));
    },
    [dispatch]
  );

  const removeFavorite = useCallback(
    (id) => {
      if (!id) {
        console.warn('Cannot remove favorite: id is required');
        return;
      }
      dispatch(removeFromFavorites(id));
    },
    [dispatch]
  );

  const clearAllFavorites = useCallback(
    () => dispatch(clearFavorites()),
    [dispatch]
  );

  const isFavorite = useCallback(
    (id) => {
      if (!id) return false;
      return favorites.some(item => item.id === id);
    },
    [favorites]
  );

  const getFavoriteCount = useCallback(
    () => favorites.length,
    [favorites]
  );

  const getFavoriteById = useCallback(
    (id) => favorites.find(item => item.id === id),
    [favorites]
  );

  return {
    favorites,
    addFavorite,
    removeFavorite,
    clearAllFavorites,
    isFavorite,
    getFavoriteCount,
    getFavoriteById,
  };
};

export default useFavorites;