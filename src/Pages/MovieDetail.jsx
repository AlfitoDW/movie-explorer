import React,{useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function MovieDetail() {
    const {id} = useParams(); // ambil id dari URL
    const [movie, setMovie] = useState(null);
    
    useEffect(() => {
        const fetchMovie = async () => {
            const res = await axios.get(
                `https://api.themoviedb.org/3/movie/${id}?api_key=c0c6d3c7ed3419a6658247e0c4fa6644&language=en-US`
            );
            setMovie(res.data);
        };
        fetchMovie();
    }, [id]);


    if (!movie) return <p className="text-white p-6 ">Loading...</p>;
    
    return (
        <div className="bg-gray-900 min-h-screen text-white py-12">
            <div className="max-w-4xl mx-auto p-6">
                <div className="flex flex-col md:flex-row gap-6">
                    <img 
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt = {movie.title}
                        className="w-64 rounded-lg shadow-lg"
                    />
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
                        <p className="text-sm text-gray-400 mb-2">
                            ⭐ {movie.vote_average} | {movie.release_date}
                        </p>
                        <p className="mb-4">{movie.overview}</p>
                        <div className="flex flex-wrap gap-2">
                            {movie.genres.map((genre)=> (
                                <span 
                                    key={genre.id}
                                    className="px-3 py-1 bg-blue-600 rounded-full text-sm"
                                >
                                    {genre.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}