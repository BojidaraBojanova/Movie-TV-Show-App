import { useContext, useEffect, useState } from "react";
import * as tvShowService from '../../services/tvShowService';
import * as commentService from '../../services/commentService';
import * as watchListService from '../../services/watchListService';
import { useParams, Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import AuthContext from "../../contexts/authContext";
import RatingModal from "../ratingModal/RatingModal";
import { pathToUrl } from "../../utils/pathUtils";
import Path from "../../paths";
import useForm from "../../hooks/useForm";
import Loader from "../loader/Loader";
import useScrollToTop from "../scrollToTop";


export default function TvShowDetails() {
    const navigate = useNavigate();
    const [tvShow, setTvShow] = useState({});
    const { tvShowId } = useParams();
    const { userId, isAuthenticated, email } = useContext(AuthContext);
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [comments, setComments] = useState([]);
    const [inWatchList, setInWatchList] = useState(false);
    const [loading, setLoading] = useState(true);

    useScrollToTop();

    const addCommentHandler = async (values) => {
        try {
            const newComment = await commentService.createTvShow(tvShowId, { user: userId, content: values.comment });
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
        const fetchTvShowAndComments = async () => {
            try {
                const tvShowData = await tvShowService.getOne(tvShowId);
                setTvShow(tvShowData);

                const commentsData = await commentService.getAllTvShowComments(tvShowId);
                setComments(commentsData.comments);

                if (isAuthenticated) {
                    const watchListResponse = await watchListService.getWatchList(userId);

                    if (watchListResponse.success && Array.isArray(watchListResponse.watchList)) {
                        setInWatchList(watchListResponse.watchList.some(item => item.item && item.item.toString() === tvShowId));
                    } else {
                        throw new Error('No watchlist data received');
                    }

                    await checkWatchListStatus();
                }
                
            } catch (error) {
                console.error('Error fetching TV-Show details and comments:', error);
            } finally {
                setLoading(false)
            }
        };

        fetchTvShowAndComments();
    }, [tvShowId, userId]);

    const getYouTubeEmbedUrl = (url) => {
        if (!url) return '';
        const videoId = url.split('v=')[1]?.split('&')[0];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
    };

    const handleRate = async (rating) => {
        try {
            const updatedTvShow = await tvShowService.rateTvShow(tvShowId, userId, rating);
            setTvShow(updatedTvShow); // Update the TV show state with the new rating
            setShowRatingModal(false);
        } catch (error) {
            console.error('Error rating TV-Show:', error);
        }
    };

    const deleteButtonClickHandler = async () => {
        const hasConfirmed = window.confirm(`Are you sure you want to delete ${tvShow.title}`);
        if (hasConfirmed) {
            try {
                await tvShowService.remove(tvShowId);
                navigate('/tvShows');
            } catch (error) {
                console.error('Error deleting TV-Show:', error);
            }
        }
    };

    const releaseDateString = tvShow.releaseDate || '';
    const releaseDate = new Date(releaseDateString);
    const year = releaseDate.getFullYear() || 'Unknown Year';
    const month = releaseDate.getMonth() + 1 || 'Unknown Month'; // Month is zero-indexed
    const day = releaseDate.getDate() || 'Unknown Day';

    let averageRating = tvShow.averageRating || 0;

    const checkWatchListStatus = async () => {
        try {
            const result = await watchListService.getWatchList(userId);

            console.log(result)

            console.log('tvShowId', tvShowId)

            if (result.success && Array.isArray(result.watchList)) {
                const isInWatchList = result.watchList.some(item => item.item && item.item.toString() === tvShowId.toString());
                console.log('Is in Watchlist in check watchlist:', isInWatchList);
                setInWatchList(isInWatchList);
            } else {
                console.error('Invalid watchlist data');
                setInWatchList(false);
            }
        } catch (error) {
            console.error('Error fetching watchlist status:', error);
            setInWatchList(false);
        }
    }

    const handleAddToWatchlist = async () => {
        try {
            const result = await watchListService.add(userId, tvShowId, 'Series');
            console.log('Added to watchlist:', result);
            await checkWatchListStatus(); // Ensure watchlist status is updated
        } catch (error) {
            console.error('Error adding to watchlist:', error);
        }
    }

    const handleRemoveFromWatchlist = async () => {
        try {
            const result = await watchListService.remove(userId, tvShowId, 'Series');
            console.log('Removed from watchlist:', result);
            await checkWatchListStatus(); // Ensure watchlist status is updated
        } catch (error) {
            console.error('Error removing from watchlist:', error);
        }
    };

    if (loading) {
        return <Loader />
    }

    return (
        <section className="tv-show-details">
            <h1>{tvShow.title} ({year})</h1>

            <div className="ratings-container">
                <i className="fa-solid fa-star"></i>
                <h5>{averageRating.toFixed(1)}/10</h5>
            </div>

            <div className="img-video-container">
                <div className="img-container">
                    {tvShow.imageUrl ? (
                        <img src={tvShow.imageUrl} alt={tvShow.title} />
                    ) : (
                        <p>No image available</p>
                    )}
                </div>

                <div className="trailer-container">
                    {tvShow.trailerUrl ? (
                        <iframe
                            width="900"
                            height="515"
                            src={getYouTubeEmbedUrl(tvShow.trailerUrl)}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <p>No trailer available.</p>
                    )}

                    <div className="director data">
                        <p><span className="label">Director: </span>{tvShow.director}</p>
                    </div>
                    <div className="writer data">
                        <p><span className="label">Writer:</span> {tvShow.writer}</p>
                    </div>
                    <div className="actors data">
                        <p><span className="label">Actors:</span> {tvShow.actors}</p>
                    </div>
                    <div className="genre data">
                        <p><span className="label">Genres:</span> {tvShow.genre}</p>
                    </div>
                    <div className="releaseDate data">
                        <p><span className="label">Release Date:</span> {day}.{month}.{year}</p>
                    </div>
                    <div className="description">
                        <p>{tvShow.description}</p>
                    </div>
                    <div className="buttons">
                        {isAuthenticated && (
                            <>
                                <Button className="yellow-btn" onClick={() => setShowRatingModal(true)}><i className="fa-regular fa-star"></i>Rate</Button>
                                <Button className="blue-btn" onClick={inWatchList ? handleRemoveFromWatchlist : handleAddToWatchlist}>
                                    {inWatchList ? '- Remove from Watchlist' : '+ Add to Watchlist'}
                                </Button>
                            </>
                        )}
                        {userId === tvShow.addedBy && (
                            <>
                                <Link to={pathToUrl(Path.SerialEdit, { tvShowId })} className="white-btn"><i className="fa-solid fa-pen"></i>Edit</Link>
                                <Button className="red-btn" onClick={deleteButtonClickHandler}><i className="fa-solid fa-trash"></i>Delete</Button>
                            </>
                        )}
                    </div>
                    <RatingModal
                        show={showRatingModal}
                        handleClose={() => setShowRatingModal(false)}
                        handleRate={handleRate}
                        title='TV-Show'
                    />
                </div>
            </div>

            {isAuthenticated && (
                <article className="create-comment">
                    <label htmlFor="comment">Add new comment:</label>
                    <form className="form" onSubmit={onSubmit}>
                        <textarea name="comment" value={values.comment} onChange={onChange} className="comment"></textarea>
                        <input className="btn submit" type="submit" value="Add Comment" />
                    </form>
                </article>
            )}

            

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
