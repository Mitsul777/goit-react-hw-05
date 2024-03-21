import axios from 'axios';

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const options = {
    headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTU2YzJiYjNiMDM4NGY3M2VhMzYyN2YxMTA3MDQ1MyIsInN1YiI6IjY1ZjgyZGE3YTZmZGFhMDE3ZDZmNjIyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UMo2oIH_nIBR0XL052jd8gsnoaDJmNgWd7zIweaIf-M"
    },
    params: {
        language: "en-US",
    }
}

export const getTrendingMovies = async () => {
    try {
        const response  = await axios.get("/trending/movie/day", options);
        return response.data.results;
    }
    catch (e) {
        console.error(e);
    }
}


export const getMovieById = async (movieId) => {
    try {
        const response = await axios.get(`/movie/${movieId}`, options);
        return response.data;
    } catch (e) {
        console.error(e);
    }
};

