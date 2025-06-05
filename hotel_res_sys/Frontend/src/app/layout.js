'use client';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import AuthModal from '../components/AuthModal';
import './globals.css';

export default function RootLayout({ children }) {
  const [authOpen, setAuthOpen] = useState(false);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserName(localStorage.getItem("user_name"));
    }
  }, []);

  function handleAuthSuccess() {
    if (typeof window !== "undefined") {
      setUserName(localStorage.getItem("user_name"));
    }
    setAuthOpen(false);
  }

  function handleLogout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user_name");
    }
    setUserName(null);
  }

  return (
    <html lang="en">
      <body>
        <Navbar
          onLoginClick={() => setAuthOpen(true)}
          userName={userName}
          onLogout={handleLogout}
        />
        <AuthModal
          open={authOpen}
          onClose={() => setAuthOpen(false)}
          onAuthSuccess={handleAuthSuccess}
        />
        {children}
      </body>
    </html>
  );
}
