import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaTrash } from "react-icons/fa";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const navigate = useNavigate();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleRemoveFavorite = (e, movieId) => {
    e.stopPropagation(); // biar gak ikut navigate
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
        <p className="text-gray-400 text-center mt-10">No favorite movies yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {favorites.map((movie) => (
            <div
              key={movie.id}
              className="relative min-w-[160px] cursor-pointer group"
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              {/* Poster */}
              <img
                src={
                  movie.poster_path
                    ? imageBaseUrl + movie.poster_path
                    : "/no-poster.jpg"
                }
                alt={movie.title}
                className="rounded-lg transition-transform duration-300 group-hover:scale-105"
              />

              {/* Overlay title (PERSIS sama dengan MovieCard) */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-sm text-center opacity-0 group-hover:opacity-100 p-2 transition-opacity duration-300">
                {movie.title}
              </div>

              {/* Tombol hapus */}
              <button
                onClick={(e) => handleRemoveFavorite(e, movie.id)}
                className="absolute top-2 right-2 text-white bg-black/60 rounded-full p-2
                opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:text-red-500"
              >
                <FaTrash className="text-sm" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
