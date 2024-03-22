import css from "./MovieReviews.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieReviews } from "../../movies-api.js";

export default function MovieReviews() {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function getData() {
            try {
                setLoading(true);
                const data = await getMovieReviews(movieId);
                setReviews(data);
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
            {reviews && reviews.length > 0 ? (
                <ul>
                    {reviews.map((review) => (
                        <li key={review.id}>
                            <h4>Author: {review.author}</h4>
                            <p>{review.content}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>We don`t have any review for this movie</p>
            )}
        </div>
    );
}