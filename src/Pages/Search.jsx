import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=c0c6d3c7ed3419a6658247e0c4fa6644&language=en-US&query=${query}`
      );
      setResults(res.data.results);
    } catch (err) {
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔻 Tambah fungsi untuk simpan ke favorites
  const handleAddFavorite = (e, movie) => {
    e.preventDefault();
    const existingFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isAlreadyFavorite = existingFavorites.some((fav) => fav.id === movie.id);

    if (!isAlreadyFavorite) {
      const updatedFavorites = [...existingFavorites, movie];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      alert(`${movie.title} added to favorites ❤️`);
    } else {
      alert(`${movie.title} is already in favorites!`);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-6 mt-8">🔎 Search Movies</h1>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
          className="flex-1 p-2 rounded bg-gray-800 text-white"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      {/* Loading spinner */}
      {loading && (
        <div className="flex justify-center mt-10">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Hasil Pencarian */}
      {!loading && results.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 overflow-hidden">
          {results.map((movie) => (
            // 🔻 Tambah class group & relative
            <div key={movie.id} className="relative group">
              <Link to={`/movie/${movie.id}`}>
                <div className="bg-gray-800 rounded-lg shadow hover:scale-105 transition">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded-t-lg"
                  />
                  <div className="p-2">
                    <h2 className="text-sm font-semibold">{movie.title}</h2>
                  </div>
                </div>
              </Link>

              {/* 🔻 Tombol favorite muncul saat hover */}
              <button
                onClick={(e) => handleAddFavorite(e, movie)}
                className="absolute top-2 right-2 text-white text-xl bg-black bg-opacity-50 rounded-full p-1
                opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:text-red-500"
              >
                ❤️
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Kalau hasil kosong */}
      {!loading && results.length === 0 && query && (
        <p className="text-gray-400 text-center mt-10">No results found.</p>
      )}
    </div>
  );
}
