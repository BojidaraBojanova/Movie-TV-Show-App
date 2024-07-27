import { useEffect, useState } from "react"
import MovieListItem from "./movie-list-item/MovieListItem"
import * as movieService from '../../services/movieService';

export default function Movies(){
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        movieService.getAll()
            .then(result => setMovies(result))
            .catch(err => {
                console.log(err)
            })
    }, [])

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