import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {FaPlay} from "react-icons/fa";

export default function MovieDetail() {
  const { id } = useParams(); // ambil id dari URL
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  

  const API_KEY = "c0c6d3c7ed3419a6658247e0c4fa6644";

  // Ambil detail film
  useEffect(() => {
    const fetchMovie = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
      );
      setMovie(res.data);
    };
    fetchMovie();
  }, [id]);

  // Ambil video trailer
 useEffect (() => {
  const fetchTrailer = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
    );
    const trailer = res.data.results.find(
      (v) => v.type === "Trailer" && v.site === "YouTube"
    );
    setTrailerKey(trailer ? trailer.key : null);
  };
  fetchTrailer();
 }, [id]);

  if (!movie) return <p className="text-white p-6">Loading...</p>;

  return (
    <div className="relative bg-[#141414] min-h-screen text-white overflow-hidden">
      {/* Background Trailer Video */}
      {trailerKey ? (
        <div className="absolute inset-0 z-0">
          <iframe
            src= {`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&loop=1&playlist=${trailerKey}&controls=0&showinfo=0&modestbranding=1`}
            title="Trailer"
            allow="autoplay; encrypted-media"
            className="w-full h-full object-cover"
            ></iframe>
            {/* overlay gradasi */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent"></div>
        </div>
      ) : (
        <div className="absolute inset-0 bg-[#141414]"></div>
      )}

      {/* Konten Film */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-60 pb-12">
        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Poster */}
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-60 rounded-lg shadow-lg hidden md:block"
          />

          {/* Info Film */}
          <div>
            <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
            <p className="text-sm text-gray-300 mb-2">
              ⭐ {movie.vote_average} | {movie.release_date}
            </p>
            <p className="max-w-2xl text-gray-200 mb-4">{movie.overview}</p>

            {/* Genre */}
            <div className="flex flex-wrap gap-2 mb-4">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-blue-600 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

              <button className="flex items-center space-x-2 bg-white text-black font-semibold px-6 py-2 rounded-md hover:bg-gray-200 transition">
                <FaPlay className="text-sm" />
                <span>Play</span>
              </button>
          </div>
        </div>
      </div>
       <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#141414] to-transparent"></div>
    </div>
  );
}
