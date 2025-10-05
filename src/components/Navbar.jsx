import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${
        isScrolled ? "bg-black/90 backdrop-blur shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 text-white">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          <span className="text-red-600">ICLIX</span>
        </Link>

        {/* Nav Links */}
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
            to="/search"
            className={`hover:text-red-500 transition ${
              location.pathname === "/search" ? "text-red-500" : ""
            }`}
          >
            Search
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
      </div>
    </nav>
  );
}
