import { useEffect, useState } from "react"
import TvShowListItem from "./tvShow-list-item/TvShowListItem"
import * as tvShowService from '../../services/tvShowService';
import Loader from "../loader/Loader";

export default function TvShows(){
    const [tvShows, setTvShow] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTvShow = async () => {
            try {
                const result = await tvShowService.getAll();
                setTvShow(result)
            } catch (error) {
                console.error('Error fetching TV-Shows', error)
            }finally{
                setLoading(false);
            }
        }
        
        fetchTvShow();
        
    }, [])

    if(loading){
        return <Loader />
    }

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