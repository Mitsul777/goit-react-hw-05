import {Routes, Route, } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage.jsx";
import MovieDetailsPage from "../../pages/MovieDetailsPage/MovieDetailsPage.jsx";
import MoviesPage from "../../pages/MoviesPage/MoviesPage.jsx";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage.jsx";
import Navigation from "./Navigation/Navigation.jsx";
import MovieCast from "../MovieCast/MovieCast.jsx";
import MovieReviews from "../MovieReviews/MovieReviews.jsx"
function App() {
    return (
        <div>
            <Navigation/>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/movies" element={<MoviesPage />} />
                <Route path="/movies/:movieId" element={<MovieDetailsPage />} >
                    <Route path="cast" element={<MovieCast/>} />
                    <Route path="reviews" element={<MovieReviews/>} />
                </Route>

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    );
}

export default App
