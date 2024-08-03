import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { pathToUrl } from "../../../utils/pathUtils";
import Path from "../../../paths"


export default function Watchlist({
    show,
    handleClose,
    userId,
    watchlist,
    removeFromWatchList
}) {
    
    return (
        <div className="wrapper">
            <h3>Watchlist</h3>

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
                    {watchlist && watchlist.length > 0 ? (
                        watchlist.map((movie, index) => (
                            <tr key={index}>
                                <td className="watchlist-title">{movie.title}</td>
                                <td className="image-wrapper-watchlist"><img src={movie.imageUrl} alt="" /></td>
                                <td>{movie.description}</td>
                                <td className="center-btn watchlist-i-btn"><Link to={pathToUrl(Path.MoviesDetails, { movieId: movie._id })} className="details-btn"><i className="fa-solid fa-circle-info"></i></Link></td>
                                <td><Button className="red-btn" onClick={() => removeFromWatchList(movie._id)}><i className="fa-solid fa-trash"></i></Button></td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                            <td>
                                No movies in the watchlist!
                            </td>
                        </tr>
                    )}

                </tbody>
            </table>
        </div>
    )
}