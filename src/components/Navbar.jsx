import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBell, FaSearch, FaChevronDown } from "react-icons/fa";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const exploreRef = useRef(null);
  const profileRef = useRef(null);
  const exploreTimerRef = useRef(null);
  const profileTimerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // tutup dropdown kalau klik di luar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
        clearTimeout(profileTimerRef.current);
      }
      if (exploreRef.current && !exploreRef.current.contains(e.target)) {
        setIsExploreOpen(false);
        clearTimeout(exploreTimerRef.current);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // PROFILE: hover open, hover leave delay, click toggle (for mobile)
  const openProfile = () => {
    clearTimeout(profileTimerRef.current);
    setIsProfileOpen(true);
  };
  const scheduleCloseProfile = () => {
    clearTimeout(profileTimerRef.current);
    profileTimerRef.current = setTimeout(() => setIsProfileOpen(false), 150);
  };
  const toggleProfileClick = (e) => {
    e.preventDefault();
    clearTimeout(profileTimerRef.current);
    setIsProfileOpen((v) => !v);
  };

  // EXPLORE (mobile): same pattern
  const openExplore = () => {
    clearTimeout(exploreTimerRef.current);
    setIsExploreOpen(true);
  };
  const scheduleCloseExplore = () => {
    clearTimeout(exploreTimerRef.current);
    exploreTimerRef.current = setTimeout(() => setIsExploreOpen(false), 150);
  };
  const toggleExploreClick = (e) => {
    e.preventDefault();
    clearTimeout(exploreTimerRef.current);
    setIsExploreOpen((v) => !v);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${
        isScrolled ? "bg-black/90 backdrop-blur shadow-md" : "bg-gradient-to-b from-black/60 via-black/30 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 text-white">
        {/* LEFT: logo + links */}
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-2xl font-bold tracking-wide">
            <span className="text-red-600">ICLIX</span>
          </Link>

          {/* desktop links */}
          <div className="hidden md:flex space-x-6 text-sm font-medium">
            <Link
              to="/"
              className={`hover:text-red-500 transition ${
                location.pathname === "/" ? "text-red-500" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/favorites"
              className={`hover:text-red-500 transition ${
                location.pathname === "/favorites" ? "text-red-500" : ""
              }`}
            >
              Favorites
            </Link>
          </div>

          {/* mobile Explore */}
          <div
            className="relative md:hidden"
            ref={exploreRef}
            onMouseEnter={openExplore}
            onMouseLeave={scheduleCloseExplore}
          >
            <button
              onClick={toggleExploreClick}
              className="flex items-center text-sm font-medium hover:text-red-500 transition"
            >
              Explore{" "}
              <FaChevronDown
                className={`ml-1 text-xs transition-transform ${
                  isExploreOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isExploreOpen && (
              <div className="absolute left-0 mt-2 bg-black/90 border border-gray-700 rounded-lg w-32 text-sm py-2 animate-fade-in">
                <Link
                  to="/"
                  onClick={() => setIsExploreOpen(false)}
                  className="block px-4 py-2 hover:bg-gray-800 transition"
                >
                  Home
                </Link>
                <hr className="border-gray-700 my-1" />
                <Link
                  to="/favorites"
                  onClick={() => setIsExploreOpen(false)}
                  className="block px-4 py-2 hover:bg-gray-800 transition"
                >
                  Favorites
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: icons + profile (IMPORTANT: profile handlers only on profile wrapper) */}
        <div className="flex items-center space-x-4">
          <Link to="/search">
            <FaSearch className="text-lg text-gray-300 hover:text-white transition cursor-pointer" />
          </Link>

          <FaBell className="text-lg text-gray-300 hover:text-white transition cursor-pointer" />

          {/* PROFILE WRAPPER: hover on this wrapper only */}
          <div
            className="relative"
            ref={profileRef}
            onMouseEnter={openProfile}
            onMouseLeave={scheduleCloseProfile}
          >
            <button
              onClick={toggleProfileClick}
              className="flex items-center cursor-pointer space-x-1"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-500">
                <img
                  src="https://i.pravatar.cc/300"
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <FaChevronDown
                className={`text-xs transition-transform duration-300 ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 top-10 bg-black/90 text-sm rounded-lg w-40 py-2 border border-gray-700 animate-fade-in">
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-800 transition">
                  Profile
                </Link>
                <Link to="/settings" className="block px-4 py-2 hover:bg-gray-800 transition">
                  Settings
                </Link>
                <hr className="border-gray-700 my-1" />
                <button
                  onClick={() => alert("Logged out!")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-800 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
