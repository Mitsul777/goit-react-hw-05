import { useParams } from "react-router-dom";
import {useEffect} from "react";
import {getMovieById} from "../../movies-api.js";


const MovieDetailsPage = () => {
    const { movieId } = useParams();

    useEffect(() => {
        async function getData() {
            try {
                const data = await getMovieById(movieId);
            } catch (error) {
                console.error("Ошибка при получении данных:", error);
            }
        }
        getData();
    }, [movieId]);

    return (
        <div>
            <h1>Movie details: {movieId}</h1>
        </div>
    );
};

export default MovieDetailsPage;
