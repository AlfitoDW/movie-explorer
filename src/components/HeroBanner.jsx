import React from "react";

export default function HeroBanner({movie}) {
    if (!movie) return null;

    return(
        <div
            className="h-[70vh] bg-cover bg bg-center flex flex-col justify-end p-8 text-white"
            style={{
                backgroundImage : `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            }}
        >
            <div className="bg-black/50 p-4 rounded max-w-xl">
                <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
                <p className="text-sm mb-4">{movie.overview.slice(0,150)}...</p>
                <div className="space-x-2">
                    <button className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 ">
                         ▶ Play
                    </button>
                    <button className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700">
                        More Info
                    </button>
                </div>
            </div>
        </div>
    )
}