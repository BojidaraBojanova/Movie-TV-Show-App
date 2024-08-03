import { useEffect, useState } from "react"
import MovieListItem from "./movie-list-item/MovieListItem"
import * as movieService from '../../services/movieService';
import Loader from "../loader/Loader";

export default function Movies(){
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const result = await movieService.getAll();
                setMovies(result)
            } catch (error) {
                console.error('Error fetching movies', error)
            }finally{
                setLoading(false);
            }
        }
        
        fetchMovies();
    }, [])

    if(loading){
        return <Loader />
    }

    return(
        <div className='movie-show-wrapper'>
            <h1>Movies</h1>
            <div className="movies-show-library-container">
                {movies.map(movie => (
                    <MovieListItem key={movie._id} {...movie}/>
                ))}

                {movies.length === 0 && (
                    <h1 className="no-articles">No Movies yet</h1>
                )}
            </div>
        </div>
    )
}