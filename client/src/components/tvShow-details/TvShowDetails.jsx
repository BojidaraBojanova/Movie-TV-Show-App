import { useContext, useEffect, useState } from "react";
import * as tvShowService from '../../services/tvShowService';
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import AuthContext from "../../contexts/authContext";

export default function TvShowDetails(){
    const [tvShow, setTvShow] = useState({});
    const { tvShowId } = useParams();
    const {userId, isAuthenticated} = useContext(AuthContext);

    console.log(userId)
    console.log(tvShow)

    useEffect(() => {
        tvShowService.getOne(tvShowId)
            .then(setTvShow)
            .catch(error => {
                console.error('Error fetching TV-Show details:', error)
            })
    }, [tvShowId])

    const releaseDateString = tvShow.releaseDate || '';
    const releaseDate = new Date(releaseDateString);
    const year = releaseDate.getFullYear() || 'Unknown Year';
    const month = releaseDate.getMonth() || 'Unknown Month';
    const day = releaseDate.getDay() || 'Unknown Day';

    const getYouTubeEmbedUrl = (url) => {
        if (!url) return '';
        const videoId = url.split('v=')[1]?.split('&')[0];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
    };

    return (
        <section className="movie-details">
            <h1>{tvShow.title}({year})</h1>

            <div className="ratings-container">
                    <i className="fa-solid fa-star"></i>
                    <h5>5.2/10</h5>
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
                                <Button className="yellow-btn"><i className="fa-regular fa-star"></i>Rate</Button>
                                <Button>+ Add to Watchlist</Button>
                            </>
                        )}
                        {userId === tvShow.addedBy && (
                            <>
                                <Button className="white-btn"><i className="fa-solid fa-pen"></i>Edit</Button>
                                <Button className="red-btn"><i className="fa-solid fa-trash"></i>Delete</Button>
                            </>

                        )}
                    </div>
                </div>
            </div>

        </section>
    );
}