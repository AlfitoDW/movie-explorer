import React from "react";
import { useNavigate } from "react-router-dom";

export default function MovieCard({ movie }) {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const navigate = useNavigate();

  return (
    <div
      className="relative min-w-[160px] cursor-pointer group"
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      {/* Poster */}
      <img
        src={movie.poster_path ? imageBaseUrl + movie.poster_path : "/no-poster.jpg"}
        alt={movie.title}
        className="rounded-lg transition-transform duration-300 group-hover:scale-105"
      />

      {/* Overlay title saat hover */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-sm text-center opacity-0 group-hover:opacity-100 p-2 transition-opacity duration-300">
        {movie.title}
      </div>
    </div>
  );
}
