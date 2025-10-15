import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function MovieDetail() {
  const { id } = useParams(); // ambil id dari URL
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

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
  useEffect(() => {
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
    <div className="bg-[#141414] min-h-screen text-white py-12">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Poster */}
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-64 rounded-lg shadow-lg"
          />

          {/* Info Film */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
            <p className="text-sm text-gray-400 mb-2">
              ⭐ {movie.vote_average} | {movie.release_date}
            </p>
            <p className="mb-4 text-gray-300">{movie.overview}</p>

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

            {/* Tombol Trailer */}
            {trailerKey && (
              <button
                onClick={() => setIsTrailerOpen(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
              >
                ▶️ Watch Trailer
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal Trailer */}
      {isTrailerOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative w-full max-w-3xl aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="Trailer"
              allowFullScreen
              className="w-full h-full rounded-lg"
            ></iframe>

            {/* Tombol Close */}
            <button
              onClick={() => setIsTrailerOpen(false)}
              className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white rounded-full px-3 py-1 transition"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
