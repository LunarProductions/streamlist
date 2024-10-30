import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import './movieStyle.css'


const API_KEY = 'c0b1b66046329093e79b51658d7c9dd0';
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(API_URL);
                setMovies(response.data.results);
                localStorage.setItem('movies', JSON.stringify(response.data.results));
            } catch (error) {
                console.error("Error fetching the movies", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    const toggleFavorite = (movie) => {
        const updatedFavorites = favorites.includes(movie.id)
            ? favorites.filter(id => id !== movie.id)
            : [...favorites, movie.id];

        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    const isFavorite = (id) => favorites.includes(id);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Popular Movies</h1>
            <Slider {...settings}>
                {movies.map(movie => (
                    <div key={movie.id} className='carousel-item'>
                        <h2 className='movie-title'>{movie.title}</h2>
                        <p className='movie-overview'>{movie.overview}</p>
                        <img 
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                            alt={movie.title} 
                            style={{ width: '100%', borderRadius: '10px' }} 
                        />
                        {/*<button onClick={() => toggleFavorite(movie)}>
                            {isFavorite(movie.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                        </button>*/}
                    </div>
                ))}
            </Slider>
           {/* <h2>Favorite Movies</h2>*/}
            <ul>
                {movies.filter(movie => isFavorite(movie.id)).map(movie => (
                    <li key={movie.id}>
                        {movie.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MovieList;
