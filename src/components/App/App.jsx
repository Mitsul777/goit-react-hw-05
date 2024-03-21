import {Routes, Route, } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage.jsx";
import MovieDetailsPage from "../../pages/MovieDetailsPage/MovieDetailsPage.jsx";
import MoviesPage from "../../pages/MoviesPage/MoviesPage.jsx";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage.jsx";
import Navigation from "./Navigation/Navigation.jsx";
function App() {
    return (
        <div>
            <Navigation/>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/movies" element={<MoviesPage />} />
                <Route path="/movies/:id" element={<MovieDetailsPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    );
}

export default App
