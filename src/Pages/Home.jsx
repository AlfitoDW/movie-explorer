import React, { useEffect, useState } from "react";
import axios from "axios";
import HeroBanner from "../components/HeroBanner";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {FaFire} from "react-icons/fa";
import { RiHeart3Fill } from "react-icons/ri";

export default function Home({ searchMode, searchQuery, setSearchQuery, setSearchMode }) {
  const [movies, setMovies] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // fetch popular
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=c0c6d3c7ed3419a6658247e0c4fa6644&language=en-US&page=1`
        );
        setMovies(res.data.results);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    if (searchMode && searchQuery && searchQuery.trim() !== "") {
      const fetchSearch = async () => {
        setLoading(true);
        try {
          const res = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=c0c6d3c7ed3419a6658247e0c4fa6644&language=en-US&query=${encodeURIComponent(
              searchQuery
            )}`
          );
          setResults(res.data.results);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchSearch();
    }
  }, [searchMode, searchQuery]);

  const handleAddFavorite = (e, movie) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!existing.some((f) => f.id === movie.id)) {
      existing.push(movie);
      localStorage.setItem("favorites", JSON.stringify(existing));
      toast(`${movie.title} added to favorites ❤️`);
    } else {
      toast(`${movie.title} is already in favorites!`);
    }
  };

  return (
    <div className="min-h-screen text-white bg-[#141414]">
  {/* HeroBanner tetap muncul */}
  {movies.length > 0 && <HeroBanner movie={movies[0]} />}

  <div className="p-6 space-y-6">
    <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-2">
      {searchMode ? (
        `Results for "${searchQuery}"`
      ) : (
        <>
          <FaFire className="text-red-500" /> Popular Movies
        </>
      )}
    </h1>

    {loading ? (
      <p className="text-gray-400 text-center">Loading...</p>
    ) : (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {(searchMode && searchQuery ? results : movies).map((movie) => (
          <div key={movie.id} className="relative group overflow-hidden rounded-lg">
            <Link to={`/movie/${movie.id}`}>
              <div className="bg-gray-800 rounded-lg shadow-lg transform transition duration-300 group-hover:scale-105 overflow-hidden">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-auto object-cover"
                />
                <div className="p-3">
                  <h2 className="text-sm font-semibold text-white truncate">
                    {movie.title}
                  </h2>
                </div>
              </div>
            </Link>
            <button
              onClick={(e) => handleAddFavorite(e, movie)}
              className="absolute top-2 right-2 text-white text-lg bg-black bg-opacity-60 rounded-full p-1
                opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:text-red-400"
            >
              <RiHeart3Fill />
            </button>
          </div>
        ))}
        {searchMode && searchQuery && results.length === 0 && (
          <p className="text-gray-400 col-span-full text-center mt-10">
            No results found.
          </p>
        )}
      </div>
    )}
  </div>
</div>
  );
}
