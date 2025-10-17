import React, { useRef } from "react";
import MovieCard from "./MovieCard";


export default function MovieCarousel({title, movies}) {
    const rowRef = useRef(null);

    //wheel hadnler
    const handleWheel = (e) => {
        const el = rowRef.current;
        if(!el) return;

        if(Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            //geser
            el.scrollLeft += e.deltaY
            // cegah halaman ikut scroll
            e.preventDefault();
        }
    }

    return (
        <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-white">{title}</h2>
            <div 
                ref={rowRef}
                onWheel={handleWheel}
                className="flex overflow-x-auto space-x-4 carousel no-scrollbar"
                role="list"
                aria-label={`${title} movies`}
                >
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    )
}