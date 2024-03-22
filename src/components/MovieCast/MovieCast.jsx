import css from "./MovieCast.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {getMovieCast} from "../../movies-api.js";
export default function MovieCast() {
    const { movieId } = useParams();
    const [cast, setCast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function getData() {
            try {
                setLoading(true);
                const data = await getMovieCast(movieId);
                setCast(data);
            } catch (error) {
                console.error("Ошибка при получении данных:", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, [movieId]);
    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && (
                <p>Oops! There has been some kind of mistake. Just try to reload the page.</p>
            )}
            {cast && (
                <ul>
                    {cast.map((actor) => {
                        return (
                            <li key={actor.cast_id}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                                    alt={actor.original_name}
                                    key={actor.cast_id}
                                />
                                <p>Original name: {actor.original_name}</p>
                                <p>Character: {actor.character}</p>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}