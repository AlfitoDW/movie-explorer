import React, {useEffect,useState} from "react";
import axios from "axios";
import HeroBanner from "../components/HeroBanner";
import {Link} from "react-router-dom"

export default function Home() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const res = await axios.get(
                `https://api.themoviedb.org/3/movie/popular?api_key=c0c6d3c7ed3419a6658247e0c4fa6644&language=en-US&page=1`
            );
            setMovies(res.data.results);
        };
        fetchMovies();
    }, []);

    const handleAddFavorite = (e,movie) => {
        e.preventDefault();
        const existingFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const isAlreadyFavorite = existingFavorites.some((fav) => fav.id === movie.id);

        if(!isAlreadyFavorite) {
            const updatedFavorites = [...existingFavorites, movie];
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            alert(`${movie.title} added to favorites  ❤️`)
        } else {
            alert(`${movie.title} is already in favorites!`);
        }
    };


    return (
        <div className=" bg-gray-900 min-h-screen text-white">
            {/* Herro banner */}
            {movies.length > 0 && <HeroBanner movie ={movies[3]}/>}

            {/* Section movie list ada padding */}
  <div className="p-6">
  <h1 className="text-3xl font-bold mb-4">🔥 Popular Movies</h1>

  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
    {movies.map((movie) => (
      // 🔻 Tambah "relative group" agar hover bekerja
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

        {/* ❤️ Tombol muncul hanya saat hover */}
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
</div>

        </div>
    )
}