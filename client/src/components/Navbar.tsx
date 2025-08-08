import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsProfileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* App Name/Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-bold text-indigo-700 tracking-tight">
              Portfolio Manager
            </Link>
          </div>

          {/* Toolbar Tabs */}
          {user && (
            <div className="flex-1 flex justify-center">
              <div className="flex space-x-6 bg-transparent">
                <Link
                  to="/dashboard"
                  className={`px-4 py-2 rounded-md text-base font-medium transition-colors duration-150 ${
                    location.pathname === '/dashboard'
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-gray-700 hover:bg-indigo-100'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/transactions"
                  className={`px-4 py-2 rounded-md text-base font-medium transition-colors duration-150 ${
                    location.pathname === '/transactions'
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-gray-700 hover:bg-indigo-100'
                  }`}
                >
                  Transactions
                </Link>
                <Link
                  to="/holdings"
                  className={`px-4 py-2 rounded-md text-base font-medium transition-colors duration-150 ${
                    location.pathname === '/holdings'
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-gray-700 hover:bg-indigo-100'
                  }`}
                >
                  Holdings
                </Link>
              </div>
            </div>
          )}

          {/* Profile/Login/Signup */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-indigo-100 hover:bg-indigo-200 focus:outline-none border border-indigo-200 shadow-sm"
                  aria-label="Profile menu"
                >
                  <span className="sr-only">Open profile menu</span>
                  <span className="text-indigo-700 font-bold text-sm">
                    {user.email[0].toUpperCase()}
                  </span>
                </button>
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <div className="px-4 py-2 text-xs text-gray-500 border-b">{user.email}</div>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-indigo-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-600 text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 