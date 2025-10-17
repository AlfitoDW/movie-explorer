import React from "react";

export default function MovieCard({movie}) {
    const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

    return (
        <div className="min-w-[180px] mr-3 relative group cursor-pointer">
            <img
                src= {movie.poster_path ? imageBaseUrl + movie.poster_path : "/no-poster.jpg"}
                alt={movie.title}
                className="rounded-lg transition-transform duration-300 group-hover:scale-105"
                />
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-sm opacity-0 group-hover:opacity-100 p-2 transiiton -opacity">
                {movie.title}
            </div>
        </div>
    );
}