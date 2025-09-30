import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router';
import { AuthContext } from 'src/context/authContext/AuthContext';

const ProtectedRoute = () => {
  const { user }: any = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/auth/auth2/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
