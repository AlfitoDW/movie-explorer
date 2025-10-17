import React from "react";
import MovieCard from "./MovieCard";

export default function MovieCarousel({title, movies}) {
    return (
        <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-white">{title}</h2>
            <div className="flex overflow-x-scroll no-scrollbar">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    )
}