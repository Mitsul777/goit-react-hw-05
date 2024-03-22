import {NavLink, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getImgPath, getMovieById} from "../../movies-api.js";
import css from './MovieDetailsPage.module.css'
import { Outlet } from 'react-router-dom';

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null)
    const [loading, setLoading] = useState(false);
    const [img, setImg] = useState("");
    const [error, setError] = useState(false);




    useEffect(() => {
        async function getData() {
            try {
                setLoading(true);
                const [movieData, imgData] = await Promise.all([
                    getMovieById(movieId),
                    getImgPath(movieId),
                ]);

                const baseURL = imgData.images.base_url;
                const size = imgData.images.poster_sizes[5];
                const posterPath = movieData.poster_path;

                setMovie(movieData);
                setImg(posterPath && `${baseURL}${size}${posterPath}`);
            } catch (e) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, [movieId]);


    return (
        <div>
            Go Back
            <div>
                <div className={css.details}>
                    <div className={css.img}>
                        <img src={img} alt="movie poster" className={css.img} />
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
