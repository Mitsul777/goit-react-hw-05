import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../movies-api.js";
import css from "./HomePage.module.css";
import {Link} from "react-router-dom";

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
            <h2 className={css.h2}>Trending today</h2>
            {isLoading && <b>Loading...</b>}
            {error && <b>Error!!!</b>}
            <ul className={css.ulList}>
                {movies.map(movie => (
                    <li key={movie.id} className={css.li}>
                        <Link to={`/movies/${movie.id}`}>
                            {movie.poster_path && (
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                            )}
                            <div className={css.h3}>{movie.title}</div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default HomePage;
