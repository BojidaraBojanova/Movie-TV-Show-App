import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { pathToUrl } from "../../../utils/pathUtils";
import Path from "../../../paths"


export default function Watchlist({
    show,
    handleClose,
    userId,
    watchlistMovies,
    watchlistTvShows,
    removeFromWatchList
}) {


    return (
        <div className="wrapper container">
            <h3>Watchlist</h3>
            <div className="watchlist-wrapper">
                <div className="moviesWatchList">
                    <h4>Movies</h4>
                    <table className="table-wrapper">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Poster</th>
                                <th>Description</th>
                                <th>Details</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {watchlistMovies && watchlistMovies.length > 0 ? (
                                watchlistMovies.map((movie, index) => (
                                    <tr key={index}>
                                        <td className="watchlist-title">{movie.title}</td>
                                        <td className="image-wrapper-watchlist"><img src={movie.imageUrl} alt="" /></td>
                                        <td>{movie.description}</td>
                                        <td className="center-btn watchlist-i-btn"><Link to={pathToUrl(Path.MoviesDetails, { movieId: movie._id })} className="details-btn"><i className="fa-solid fa-circle-info"></i></Link></td>
                                        <td><Button className="red-btn" onClick={() => removeFromWatchList(movie._id, 'Movie')}><i className="fa-solid fa-trash"></i></Button></td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5"> 
                                        No movies in the watchlist!
                                    </td>
                                </tr>
                            )}

                        </tbody>
                    </table>

                </div>

                <div className="tvShowsWatchList">
                    <h4>TV-Shows</h4>
                    <table className="table-wrapper">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Poster</th>
                                <th>Description</th>
                                <th>Details</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {watchlistTvShows && watchlistTvShows.length > 0 ? (
                                watchlistTvShows.map((tvShow, index) => (
                                    <tr key={index}>
                                        <td className="watchlist-title">{tvShow.title}</td>
                                        <td className="image-wrapper-watchlist"><img src={tvShow.imageUrl} alt="" /></td>
                                        <td>{tvShow.description}</td>
                                        <td className="center-btn watchlist-i-btn"><Link to={pathToUrl(Path.SerialsDetails, { tvShowId: tvShow._id })} className="details-btn"><i className="fa-solid fa-circle-info"></i></Link></td>
                                        <td><Button className="red-btn" onClick={() => removeFromWatchList(tvShow._id, 'Series')}><i className="fa-solid fa-trash"></i></Button></td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">
                                        No Tv-shows in the watchlist!
                                    </td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                </div>

            </div>



        </div>
    )
}