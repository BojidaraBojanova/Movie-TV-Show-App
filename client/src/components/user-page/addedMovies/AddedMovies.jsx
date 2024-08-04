import { useEffect, useState, useContext } from "react"
import { Link, useNavigate, useParams } from 'react-router-dom';
import { pathToUrl } from "../../../utils/pathUtils";
import Path from "../../../paths"
import * as movieService from '../../../services/movieService'
import AuthContext from "../../../contexts/authContext"
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';




export default function AddedMovies({
    show,
    handleClose,
}) {
    const [allMoviesByUser, setAllMoviesByUser] = useState([]);
    const { userId } = useContext(AuthContext);
    const navigate = useNavigate();


    useEffect(() => {
        movieService.getAllMoviesByUser(userId)
            .then(result => setAllMoviesByUser(result))
            .catch(err => {
                console.log(err)
            })
    }, [])

    const deleteButtonClickHHandler = async(movieId) => {
        const hasConfirmed = confirm(`Are you sure you want to delete the movie`);

        if(hasConfirmed){
            await movieService.remove(movieId);
            setAllMoviesByUser(prevMovies => prevMovies.filter(movie => movie._id !== movieId));
            navigate('/user')
        }
    }

    return (
        <div className="wrapper">
            <h3>Added Movies</h3>
            <table className="table-wrapper">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Director</th>
                        <th>Writer</th>
                        <th>Details</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                {allMoviesByUser.length > 0 ? (
                    allMoviesByUser.map(movie => (
                        <tr key={movie._id}>
                            <td>{movie.title}</td>
                            <td>{movie.director}</td>
                            <td>{movie.writer}</td>
                            <td className="center-btn"><Link to={pathToUrl(Path.MoviesDetails, { movieId: movie._id})} className="details-btn"><i className="fa-solid fa-circle-info"></i></Link></td>
                            <td className="edit-btn"><Link to={pathToUrl(Path.MovieEdit, { movieId: movie._id})} className="white-btn movie-edit-btn"><i className="fa-solid fa-pen"></i></Link></td>
                            <td><Button className="red-btn delete-btn-user" onClick={() => deleteButtonClickHHandler(movie._id)}><i className="fa-solid fa-trash"></i></Button></td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6">No added movies yet</td>
                    </tr>
                )}
                    
                    
                </tbody>
            </table>
            <div>
                
            </div>
        </div>
    )
}