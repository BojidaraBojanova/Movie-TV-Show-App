import { useEffect, useState, useContext } from "react"
import { Link, useNavigate } from 'react-router-dom';
import { pathToUrl } from "../../../utils/pathUtils";
import Path from "../../../paths"
import * as tvShowService from '../../../services/tvShowService'
import AuthContext from "../../../contexts/authContext"
import Button from 'react-bootstrap/Button';

export default function AddedTvShows() {
    const [allTvShowsByUser, setAllTvShowsByUser] = useState([]);
    const { userId } = useContext(AuthContext);
    const navigate = useNavigate();


    useEffect(() => {
        tvShowService.getAllTvShowByUser(userId)
            .then(result => setAllTvShowsByUser(result))
            .catch(err => {
                console.log(err)
            })
    }, [])

    const deleteButtonClickHHandler = async (tvShowId) => {
        const hasConfirmed = confirm(`Are you sure you want to delete the movie`);

        if (hasConfirmed) {
            await tvShowService.remove(tvShowId);
            setAllTvShowsByUser(prevTvShows => prevTvShows.filter(tvShow => tvShow._id !== tvShowId));
            navigate('/user')
        }
    }

    return (
        <div className="wrapper">
            <h3>Added TV-Shows</h3>
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
                    {allTvShowsByUser.length > 0 ? (
                        allTvShowsByUser.map(tvShow => (
                            <tr key={tvShow._id}>
                                <td>{tvShow.title}</td>
                                <td>{tvShow.director}</td>
                                <td>{tvShow.writer}</td>
                                <td className="center-btn"><Link to={pathToUrl(Path.SerialsDetails, { tvShowId: tvShow._id })} className="details-btn"><i className="fa-solid fa-circle-info"></i></Link></td>
                                <td className="edit-btn"><Link to={pathToUrl(Path.SerialEdit, { tvShowId: tvShow._id })} className="white-btn movie-edit-btn"><i className="fa-solid fa-pen"></i></Link></td>
                                <td><Button className="red-btn" onClick={() => deleteButtonClickHHandler(tvShow._id)}><i className="fa-solid fa-trash"></i></Button></td>
                            </tr>
                        ))
                    ):(
                        <tr>
                            <td colSpan="6">No added TV-shows yet</td>
                        </tr>
                    )}
                    

                </tbody>
            </table>
            <div>

            </div>
        </div>
    )
}
