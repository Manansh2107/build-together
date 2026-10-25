import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

/**
 * ProtectedRoute component:
 * Restricts access to authenticated users only.
 * If user is not logged in, redirects them to /sign-in,
 * preserving the attempted target URL in state so they can be
 * seamlessly returned to it after signing in.
 */
export const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AppContext);
  const location = useLocation();

  if (!currentUser) {
    return (
      <Navigate
        to="/sign-in"
        state={{
          from: location,
          message: 'Please sign in or create an account to access that page.',
        }}
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;
