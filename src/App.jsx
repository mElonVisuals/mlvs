import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from '@/components/LandingPage';
import { LoginForm } from '@/components/LoginForm';
import { NewAdminPanel } from '@/components/NewAdminPanel';
import { Toaster } from '@/components/ui/toaster';
import { useAuth } from '@/hooks/useAuth';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const { isAuthenticated, isLoading, login, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleLogin = (password) => {
    const success = login(password);
    if (success) {
      setShowLogin(false);
    }
    return success;
  };

  const handleLogout = () => {
    logout();
    setShowLogin(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center cyberpunk-rp-bg">
        <motion.div
          animate={{ rotate: [0, 360, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-16 h-16 border-4 border-primary border-t-transparent border-b-secondary rounded-full"
        ></motion.div>
        <p className="ml-4 text-xl text-secondary tracking-widest animate-pulse">SYSTEM_CORE_ONLINE...</p>
      </div>
    );
  }

  const pageVariants = {
    initial: { opacity: 0, filter: 'blur(10px)', x: '-50vw', scale: 0.9 },
    in: { opacity: 1, filter: 'blur(0px)', x: 0, scale: 1 },
    out: { opacity: 0, filter: 'blur(10px)', x: '50vw', scale: 0.9 },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.75,
  };

  return (
    <Router>
      <div className="App">
        <AnimatePresence mode="wait">
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/console" replace />
                ) : showLogin ? (
                  <motion.div
                    key="login-modal"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <LoginForm onLogin={handleLogin} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="landing"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <LandingPage onLoginClick={handleLoginClick} />
                  </motion.div>
                )
              }
            />

            {/* 🔐 Direct login route */}
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/console" replace />
                ) : (
                  <motion.div
                    key="login-page"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <LoginForm onLogin={handleLogin} />
                  </motion.div>
                )
              }
            />

            <Route
              path="/console"
              element={
                isAuthenticated ? (
                  <motion.div
                    key="admin"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <NewAdminPanel onLogout={handleLogout} />
                  </motion.div>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
