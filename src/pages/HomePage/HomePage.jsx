import {useEffect, useState} from "react";
import { getTrendingMovies } from "../../movies-api.js";
import css from "./HomePage.module.css";
import MovieList from "../../components/MoviesList/MovieList.jsx";


const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading ] = useState(false)
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true)
                const moviesData = await getTrendingMovies();
                setMovies(moviesData);
            } catch (error) {
                console.error("Error fetching trending movies:", error);
                setError(true)
            }
            finally {
                setIsLoading(false)
            }
        }

        fetchData();
    }, []);

    return (

        <div>
            <h2 className={css.h2}>Trending movies</h2>
            {isLoading && <b>Loading...</b>}
            {error && <b>Error!!!</b>}
            <MovieList movies={movies}/>
        </div>
    );
}

export default HomePage;
