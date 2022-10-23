import {useState, useEffect} from "react";

import MovieCard from "./MovieCard";

import './App.css';
import SearchIcon from "./search.svg"

// 7cb94089

const API_URL = "http://www.omdbapi.com?apikey=7cb94089"

const movie1 = {
    "Title": "Dragon Ball Super",
    "Year": "2015–2018",
    "imdbID": "tt4644488",
    "Type": "series",
    "Poster": "https://m.media-amazon.com/images/M/MV5BY2I2MzI1ODYtMWRlOS00MzdhLWEyOWEtYWJhNmFiZTIxMGJhXkEyXkFqcGdeQXVyMTExNDQ2MTI@._V1_SX300.jpg"
}

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async(title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Super');
    }, []);

    return (
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input
                    placeholder="Search for movies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
               <img
                 src={SearchIcon}
                 alt="search"
                 onClick={() => searchMovies(searchTerm)}
               />
            </div>

            {
                movies?.length > 0
                ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie}/>
                        ))}
                     </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )

            }
           
        </div>
    );
}

export default App;