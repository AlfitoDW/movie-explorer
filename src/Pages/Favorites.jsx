import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaTrash } from "react-icons/fa";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleRemoveFavorite = (movieId) => {
    const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="bg-[#141414] min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-6 mt-9 flex items-center gap-2">
        <FaHeart className="text-red-500" /> Your Favorites
      </h1>

      {favorites.length === 0 ? (
        <p className="text-gray-400 text-center mt-10">
          No favorite movies yet.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {favorites.map((movie) => (
            // 🔻 Tambah "relative group" agar hover bisa aktif
            <div key={movie.id} className="relative group">
              <Link to={`/movie/${movie.id}`}>
                <div className="bg-gray-800 rounded-lg shadow hover:scale-105 transition">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded-t-lg"
                  />
                  <div className="p-2">
                    <h2 className="text-sm font-semibold truncate">{movie.title}</h2>
                  </div>
                </div>
              </Link>

              
              <button
                onClick={() => handleRemoveFavorite(movie.id)}
                className="absolute top-2 right-2 text-white text-xl bg-black bg-opacity-50 rounded-full p-1
                opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:text-red-500"
              >
                <FaTrash className = "text-white text-sm"/>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
