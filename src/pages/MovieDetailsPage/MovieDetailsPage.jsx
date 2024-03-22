import {NavLink, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getMovieById} from "../../movies-api.js";
import css from './MovieDetailsPage.module.css'
import { Outlet } from 'react-router-dom';

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);


    useEffect(() => {
        async function getData() {
            try {
                setLoading(true);
                const data = await getMovieById(movieId);
                setMovie(data)
            } catch (error) {
                console.error("Ошибка при получении данных:", error);
            }
        }
        getData();
    }, [movieId]);

    return (
        <div>
            Go Back
            <div className={css.details}>
                <div className={css.img}>
                </div>
                <div className={css.info}>
                    {movie && (
                        <>
                            <h2>{movie.title}</h2>
                            <p>User score: {movie.vote_average}</p>
                            <h3>Overview</h3>
                            <p>{movie.overview}</p>
                            <h3>Genres</h3>
                        </>
                    )}
                </div>
                <ul>
                    <li>
                        <NavLink to="cast">
                            Cast
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="reviews">
                            Reviews
                        </NavLink>
                    </li>
                </ul>
                <Outlet />
            </div>
        </div>
    );
};

export default MovieDetailsPage;
