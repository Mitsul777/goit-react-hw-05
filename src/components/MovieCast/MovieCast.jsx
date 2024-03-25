import css from "./MovieCast.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {getMovieCast} from "../../movies-api.js";
export default function MovieCast() {
    const { movieId } = useParams();
    const [casts, setCast] = useState(null);
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
            {casts && (
                <ul className={css.ul}>
                    {casts.cast.map((cast) => {
                        return (
                            <li key={cast.cast_id} className={css.li}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
                                    alt=""
                                    key={cast.id}
                                />
                                <p>Original name: {cast.original_name}</p>
                                <p>Character: {cast.character}</p>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}