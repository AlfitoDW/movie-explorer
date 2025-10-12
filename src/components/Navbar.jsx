import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBell, FaSearch, FaChevronDown, FaTimes } from "react-icons/fa";
import {toast} from "react-hot-toast";

export default function Navbar({ setSearchMode, setSearchQuery }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [localQuery, setLocalQuery] = useState("");
  const [isExploreOpen, setIsExploreOpen] = useState(false);  
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Movie : The Creator",
      description: "Now streaming on ICLIX",
      time: "2h ago",
      thumbnail :"https://image.tmdb.org/t/p/w500/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    },
    {
      id: 2,
      title: "Top 10 This Week",
      description: "Don't miss trending movies now!",
      time: "5h ago",
      thumbnail: "https://image.tmdb.org/t/p/w500/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg",
    },
  ]);
  
  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const searchInputRef = useRef(null);
  const exploreRef = useRef(null);
  const profileCloseTimer = useRef(null);
  const exploreCloseTimer = useRef(null);

  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
      if (
        isSearchActive &&
        searchInputRef.current &&
        !searchInputRef.current.contains(e.target)
      ) {
        setIsSearchActive(false);
      }
      if (exploreRef.current && !exploreRef.current.contains(e.target)) {
        setIsExploreOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
      setIsNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSearchActive, isExploreOpen,isNotifOpen]);

  const submitSearch = () => {
    setSearchQuery(localQuery);
    setSearchMode(true);
    setIsSearchActive(false);
  };

  const handleExploreMouseEnter = () => {
    clearTimeout(exploreCloseTimer.current);
    setIsExploreOpen(true);
  };
  const handleExploreMouseLeave = () => {
    exploreCloseTimer.current = setTimeout(() => {
      setIsExploreOpen(false);
    }, 200);
  };

  const handleProfileMouseEnter = () => {
    clearTimeout(profileCloseTimer.current);
    setIsProfileOpen(true);
  };
  const handleProfileMouseLeave = () => {
    profileCloseTimer.current = setTimeout(() => {
      setIsProfileOpen(false);
    }, 200);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${
        isScrolled
          ? "bg-black/90 backdrop-blur shadow-md"
          : "bg-gradient-to-b from-black/60 via-black/30 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-3 text-white">
        {/* Logo */}
        <Link
          to="/"
          onClick={() => {
            setSearchMode(false);
            setSearchQuery("");
          }}
          className="text-2xl font-bold tracking-wide mr-8"
        >
          <span className="text-red-600">ICLIX</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          <Link
            to="/"
            onClick={() => {
              setSearchMode(false);
              setSearchQuery("");
            }}
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

        {/* Explore dropdown mobile */}
        <div
          className="relative md:hidden ml-4"
          ref={exploreRef}
          onMouseEnter={handleExploreMouseEnter}
          onMouseLeave={handleExploreMouseLeave}
        >
          <button className="flex items-center text-sm font-medium hover:text-red-500 transition">
            Explore <FaChevronDown className={isExploreOpen ? "rotate-180 mx-2 text-xs transition-transform duration-300" : "mx-2 text-xs transition-transform duration-300"} />
          </button>
            <div className={`absolute left-0 mt-2 bg-black/90 border border-gray-700 rounded-lg w-32 text-sm py-2 transition-all duration-200 ease-in-out transform
              ${isExploreOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-3 invisible"}`}
            >
              <Link
                to="/"
                onClick={() => {
                  setSearchMode(false);
                  setSearchQuery("");
                  setIsExploreOpen(false);
                }}
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
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right: search / notif / profil */}
        <div className="flex items-center space-x-3 md:space-x-4">
          <div className="relative" ref={searchInputRef}>
            {isSearchActive ? (
              <div className="search-input-slide flex items-center bg-black/70 border border-gray-600 rounded-full pl-3 pr-2 h-9 transition-all duration-300">
                <FaSearch className="text-gray-400 mr-2 text-sm" />
                <input
                  type="text"
                  value={localQuery}
                  onChange={(e) => setLocalQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      submitSearch();
                    }
                  }}
                  autoFocus
                  placeholder="Search..."
                  className="bg-transparent text-sm text-white placeholder-gray-400 outline-none w-36 md:w-48"
                />
                <button
                  onClick={() => {
                    setIsSearchActive(false);
                    setLocalQuery("");
                  }}
                  className="text-gray-400 hover:text-white ml-1 flex items-center"
                >
                  <FaTimes size={13} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsSearchActive(true);
                  setLocalQuery("");
                }}
                className="flex items-center justify-center text-lg text-gray-300 hover:text-white transition cursor-pointer h-9 w-9"
              >
                <FaSearch />
              </button>
            )}
          </div>

          {/* 🔔 Notifikasi Dropdown */}
          <div
            className="relative"
            ref={notifRef}
            onMouseEnter={() => setIsNotifOpen(true)}
            onMouseLeave={() => setIsNotifOpen(false)}
          >
            <button
              className="relative flex items-center justify-center text-lg text-gray-300 hover:text-white transition cursor-pointer h-9 w-9"
            >
              <FaBell />
              {/* 🔴 Indikator notif */}
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 bg-red-600 rounded-full w-2.5 h-2.5 border border-black"></span>
              )}
            </button>

            {/* 🔽 Dropdown */}
            <div
              className={`absolute right-0 top-10 bg-black/90 border border-gray-700 rounded-lg w-80 max-h-96 overflow-y-auto shadow-xl transition-all duration-300 ease-in-out transform origin-top ${
                isNotifOpen
                  ? "opacity-100 translate-y-0 visible"
                  : "opacity-0 -translate-y-2 invisible"
              }`}
            >
              <p className="px-4 py-2 text-gray-400 text-sm border-b border-gray-700">
                Notifikasi Terbaru
              </p>

              {notifications.length === 0 ? (
                <p className="px-4 py-3 text-gray-500 text-sm text-center">
                  Tidak ada notifikasi.
                </p>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800/70 transition"
                  >
                    <img
                      src={notif.thumbnail}
                      alt={notif.title}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                    <div className="flex flex-col text-sm">
                      <p className="text-white font-medium leading-tight">
                        {notif.title}
                      </p>
                      <p className="text-gray-400 truncate max-w-[220px] text-xs">
                        {notif.description}
                      </p>
                      <span className="text-gray-500 text-xs mt-1">{notif.time}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div
            className="relative"
            ref={profileRef}
            onMouseEnter={handleProfileMouseEnter}
            onMouseLeave={handleProfileMouseLeave}
          >
            <button
              className="flex items-center cursor-pointer space-x-1"
              onClick={() => setIsProfileOpen((v) => !v)}
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
              <div className={`absolute right-0 top-10 bg-black/90 text-sm rounded-lg w-40 py-2 border border-gray-700 transition-all duration-200 ease-in-out transform
                ${isProfileOpen ? "opacity-100 traslate-y-0 visible" : "opacity-0 -translate-y-3 invisible"}`} 
                >
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-800 transition">
                  Profile
                </Link>
                <Link to="/settings" className="block px-4 py-2 hover:bg-gray-800 transition">
                  Settings
                </Link>
                <hr className="border-gray-700 my-1" />
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    toast("Logged out!");
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg_gray-800 transition"
                >
                  Logout
                </button>
              </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
