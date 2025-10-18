import React, { useRef, useState } from "react";
import MovieCard from "./MovieCard";


export default function MovieCarousel({title, movies}) {
    const rowRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const startDrag = (e) => {
    setIsDragging(true);
    setStartX(e.pageX || e.touches?.[0]?.pageX);
    setScrollLeft(rowRef.current.scrollLeft);
    };

    const stopDrag = () => {
        setIsDragging(false);
    };

    const handleDrag = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX || e.touches?.[0]?.pageX;
        const walk = (x - startX) * 1.5; // kecepatan geser
        rowRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-white">{title}</h2>
            <div 
                ref={rowRef}
                className="flex overflow-x-auto space-x-4 no-scrollbar cursor-grab active:cursor-grabbing"
                role="list"
                aria-label={`${title} movies`}
                onMouseDown={startDrag}
                onMouseLeave={stopDrag}
                onMouseUp={stopDrag}
                onMouseMove={handleDrag}
                onTouchStart = {startDrag}
                onTouchEnd={stopDrag}
                onTouchMove={handleDrag}
                >
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    )
}