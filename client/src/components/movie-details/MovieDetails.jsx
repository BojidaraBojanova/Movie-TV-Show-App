import { useContext, useEffect, useState } from "react";
import * as movieService from '../../services/movieService';
import * as commentService from '../../services/commentService';
import { useParams, Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import AuthContext from "../../contexts/authContext";
import RatingModal from "../ratingModal/RatingModal";
import { pathToUrl } from "../../utils/pathUtils";
import Path from "../../paths"
import useForm from "../../hooks/useForm";


export default function MovieDetails() {
    const navigate = useNavigate()
    const [movie, setMovie] = useState({});
    const {userId, isAuthenticated, email} = useContext(AuthContext);
    const [showRatingModal, setShowRatingModal] = useState(false);
    const { movieId } = useParams();
    const [comments, setComments] = useState([]);


    const addCommentHandler = async (values) => {
        try {
            const newComment = await commentService.createMovie(movieId, { user: userId, content: values.comment });
            if (email) {
                newComment.user = { email }; 
            }
            setComments((prevComments) => [...prevComments, newComment]);
            values.comment = ''; 
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const { values, onChange, onSubmit } = useForm(addCommentHandler, { comment: '' });


    useEffect(() => {
        // movieService.getOne(movieId)
        //     .then(setMovie)
        //     .catch(error => {
        //         console.error('Error fetching movie details:', error);
        //         // Optionally handle error state here
        //     });
        const fetchMovieAndComments = async () => {
            try {
                const movieData = await movieService.getOne(movieId);
                setMovie(movieData);

                const commentsData = await commentService.getAllMoviesComments(movieId);
                setComments(commentsData.comments);
            } catch (error) {
                console.error('Error fetching Movie details and comments:', error);
            }
        };

        fetchMovieAndComments();
    }, [movieId]);

    // Extract year from releaseDate, default to empty if not available
    const releaseDateString = movie.releaseDate || '';
    const releaseDate = new Date(releaseDateString);
    const year = releaseDate.getFullYear() || 'Unknown Year';
    const month = releaseDate.getMonth() || 'Unknown Month';
    const day = releaseDate.getDate() || 'Unknown Day';


    // Extract video ID and return YouTube embed URL
    const getYouTubeEmbedUrl = (url) => {
        if (!url) return '';
        const videoId = url.split('v=')[1]?.split('&')[0];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
    };

    const handleRate = async (rating) => {
        try {
            const updatedMovie = await movieService.rateMovie(movieId, userId, rating);
            setMovie(updatedMovie); // Update the movie state with the new rating
            setShowRatingModal(false);
        } catch (error) {
            console.error('Error rating movie:', error);
        }
    };

    let averageRating = movie.averageRating;

    if(!averageRating){
        averageRating = 0;
    }

    const deleteButtonClickHHandler = async() => {
        const hasConfirmed = confirm(`Are you sure you want to delete ${movie.title}`);

        if(hasConfirmed){
            await movieService.remove(movieId);

            navigate('/movies')
        }
    }

    return (
        <section className="movie-details">
            <h1>{movie.title}({year})</h1>

            <div className="ratings-container">
                    <i className="fa-solid fa-star"></i>
                    <h5>{averageRating}/10</h5>
                </div>
            <div className="img-video-container">
                <div className="img-container">
                    {movie.imageUrl ? (
                        <img src={movie.imageUrl} alt={movie.title} />
                    ) : (
                        <p>No image available</p>
                    )}
                </div>
                <div className="trailer-container">
                    {movie.trailerUrl ? (
                        <iframe
                            width="900"
                            height="515"
                            src={getYouTubeEmbedUrl(movie.trailerUrl)}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <p>No trailer available.</p>
                    )}
                    <div className="director data">
                        <p><span className="label">Director: </span>{movie.director}</p>
                    </div>
                    <div className="writer data">
                        <p><span className="label">Writer:</span> {movie.writer}</p>
                    </div>
                    <div className="actors data">
                        <p><span className="label">Actors:</span> {movie.actors}</p>
                    </div>
                    <div className="genre data">
                        <p><span className="label">Genres:</span> {movie.genre}</p>
                    </div>
                    <div className="releaseDate data">
                        <p><span className="label">Release Date:</span> {day}.{month}.{year}</p>
                    </div>
                    <div className="description">
                        <p>{movie.description}</p>
                    </div>
                    <div className="buttons">
                        {isAuthenticated && (
                            <>
                                <Button className="yellow-btn" onClick={() => setShowRatingModal(true)}><i className="fa-regular fa-star"></i>Rate</Button>
                                <Button>+ Add to Watchlist</Button>
                            </>
                        )}
                       
                        {userId === movie.addedBy && (
                            <>
                                <Link to={pathToUrl(Path.MovieEdit, {movieId})} className="white-btn"><i className="fa-solid fa-pen"></i>Edit</Link>
                                <Button className="red-btn" onClick={deleteButtonClickHHandler}><i className="fa-solid fa-trash"></i>Delete</Button>
                            </>

                        )}
                       
                    </div>
                    <RatingModal 
                        show={showRatingModal}
                        handleClose={() => setShowRatingModal(false)}
                        handleRate={handleRate}
                        title = 'Movie'
                    />
                </div>
            </div>

            <article className="create-comment">
                <label htmlFor="comment">Add new comment:</label>
                <form className="form" onSubmit={onSubmit}>
                    <textarea name="comment" value={values.comment} onChange={onChange} className="comment"></textarea>
                    <input className="btn submit" type="submit" value="Add Comment" />
                </form>
            </article>

            <div className="details-comments">
                <h3>Comments</h3>
                <ul>
                    {comments.map(({ _id, content, user }) => (
                        <li key={_id} className="comment">
                            <p><label className="user-email">{user.email}:</label> {content}</p>
                        </li>
                    ))}
                </ul>

                {comments.length === 0 && (
                    <p className="no-comment">No comments</p>
                )}
            </div>

        </section>
    );
}
