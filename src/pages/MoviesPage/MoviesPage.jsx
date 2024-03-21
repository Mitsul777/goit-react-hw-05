import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FaSearch } from 'react-icons/fa';
import css from "./MoviesPage.module.css";
import toast, { Toaster } from 'react-hot-toast';
// import { searchMovies } from "../../movies-api.js";
import {useSearchParams} from "react-router-dom";

const MoviesPage = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [params, setParams] = useSearchParams()
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const query = params.get("query") ?? "";

    const submitHandler = (e) => {
        e.preventDefault()
        setParams({query: e.target.elements.query.value});
        e.target.reset()
    }

    useEffect(() => {
        async function getData(query) {
            try {
                setIsLoading(true);
                const data = await searchMovies(query);
                setSearchResults(data);
            } catch (e) {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        }
        if (query) {
            getData()
        }
    }, [query]);

    return (
        <div>
            <form onSubmit={submitHandler}>
                <input
                    className={css.input}
                    type="text"
                    name="query"
                    placeholder="Type your keyword for search"
                    pattern="[a-zA-Z0-9]+"
                    required
                ></input>
                <button className={css.btn}>Search</button>
            </form>

            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}

            {!isLoading && searchResults.length === 0 && <div>No results found</div>}

            <ul className={css.movieList}>
                {searchResults.map(movie => (
                    <li key={movie.id}>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                        <h3>{movie.title}</h3>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MoviesPage;


