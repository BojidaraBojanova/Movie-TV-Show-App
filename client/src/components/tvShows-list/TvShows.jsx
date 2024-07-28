import { useEffect, useState } from "react"
import TvShowListItem from "./tvShow-list-item/TvShowListItem"
import * as tvShowService from '../../services/tvShowService';

export default function TvShows(){
    const [tvShows, setTvShow] = useState([]);

    useEffect(() => {
        tvShowService.getAll()
            .then(result => setTvShow(result))
            .catch(err => {
                console.log(err)
            })
    }, [])

    return(
        <div className='movie-show-wrapper'>
            <h1>TV-Shows</h1>
            <div className="movies-show-library-container">
                {tvShows.map(tvShow => (
                    <TvShowListItem key={tvShow._id} {...tvShow}/>
                ))}

                {tvShows.length === 0 && (
                    <h1 className="no-articles">No TV-Shows yet</h1>
                )}
            </div>
        </div>
    )
}