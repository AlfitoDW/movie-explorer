import React,{useEffect, useState} from "react";
import MovieCarousel from "../components/MovieCarousel";

const API_KEY = "c0c6d3c7ed3419a6658247e0c4fa6644";
const BASE_URL = "https://api.themoviedb.org/3";

export default function FilmPage() {
    const [genres, setGenres] = useState([]);
    const [moviesByGenre, setMoviesByGenre] = useState({});

    useEffect(() => {
        const fetchGenres = async () => {
            const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`);
            const data = await res.json();
            setGenres(data.genres);
        };
        fetchGenres();
    },[])

    useEffect(() => {
        if (genres.length > 0) {
            genres.forEach(async (genre) => {
                const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genre.id}&language=en-US`);
                const data = await res.json();
                setMoviesByGenre((prev) => ({...prev, [genre.name]: data.results}));
            });
        }
    }, [genres]);

    return (
        <div className="bg-[#151515] min-h-screen p-6 ">
            <h1 className="text-3xl font-bold text-white mb-6 mt-9">
                Film
            </h1>
            {genres.map(
                (genre) =>
                    moviesByGenre[genre.name] && (
                        <MovieCarousel key = {genre.id} title={genre.name} movies={moviesByGenre[genre.name]}/>
                    )
            )}
        </div>
    )
}

