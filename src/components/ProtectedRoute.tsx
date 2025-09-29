import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();
  const [, setLocation] = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-navy text-slate-900 dark:text-white overflow-x-hidden flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-xl text-slate-600 dark:text-slate-400">Authenticating...</p>
        </motion.div>
      </div>
    );
  }

  if (!isAuthenticated) {
    setLocation('/');
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
