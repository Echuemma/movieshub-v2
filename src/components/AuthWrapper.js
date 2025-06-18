import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeAuth } from '../store/authSlice';

const AuthWrapper = ({ children, loadingComponent = <div>Loading...</div> }) => {
  const dispatch = useDispatch();
  const { isInitialized } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isInitialized) {
      dispatch(initializeAuth());
    }
  }, [dispatch, isInitialized]);

  if (!isInitialized) {
    return loadingComponent;
  }

  return children;
};

export default AuthWrapper;
