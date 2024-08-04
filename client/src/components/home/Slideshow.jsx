import { useEffect, useState } from "react"
import * as movieService from '../../services/movieService';
import Loader from "../loader/Loader"

export default function Slideshow() {

    const [movies, setMovies] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        movieService.getAll().then(allMovies => {
            const randomMovies = getRandomMovies(allMovies, 4);
            setMovies(randomMovies);
        });
    }, []);

    const getRandomMovies = (movies, count) => {
        const shuffled = movies.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % movies.length);
    }

    useEffect(() => {
        const interval = setInterval(nextSlide, 3000);
        return () => clearInterval(interval);
    }, [movies]);

    if (movies.length === 0) {
        return <Loader />
    }


    return (
        <div className="slideshow-container">
            {movies.map((movie, index) => (
                <div key={movie._id} className={`slide ${index === currentSlide ? 'active' : ''}`}>
                    <div className="background-image" style={{backgroundImage: `url(${movie.imageUrl})`}}></div>
                    <img src={movie.imageUrl} alt={movie.title} className="movie-image" />
                </div>


            ))}

        </div>
    )
}