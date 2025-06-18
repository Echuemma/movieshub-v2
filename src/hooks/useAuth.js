import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { 
  registerUser, 
  loginUser, 
  logoutUser, 
  clearError 
} from '../store/authSlice';

const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isLoading, error, isAuthenticated, isInitialized } = useSelector(
    (state) => state.auth
  );

  const register = useCallback(
    (userData) => dispatch(registerUser(userData)),
    [dispatch]
  );

  const login = useCallback(
    (credentials) => dispatch(loginUser(credentials)),
    [dispatch]
  );

  const logout = useCallback(
    () => dispatch(logoutUser()),
    [dispatch]
  );

  const clearAuthError = useCallback(
    () => dispatch(clearError()),
    [dispatch]
  );

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    isInitialized,
    register,
    login,
    logout,
    clearError: clearAuthError,
  };
};


export default useAuth;