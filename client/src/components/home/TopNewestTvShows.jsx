import React, { useEffect, useState } from "react";
import { getTopNewestTvShow } from "../../services/tvShowService";
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'

export default function TopNewestTvShows() {
    const [tvShows, setTvShows] = useState([]);

    useEffect(() => {
        const fetchTopNewestTvShows = async () => {
            try {
                const data = await getTopNewestTvShow();
                console.log(data)
                setTvShows(data)
            } catch (error) {
                console.error('Error fetching top newest tv-shows', error)
            }
        }

        fetchTopNewestTvShows();
    }, [])

    return (
        <div className='movies-wrapper'>

            <div className="movies-container">
                <div className="title-wrapper">
                    <h2>Top 5 Newest TV-Shows</h2>
                </div>
                <div className="items-wrapper">
                    {tvShows.map(tvShows => (
                        <Link to={`/tvShows/${tvShows._id}`} key={tvShows._id} style={{ textDecoration: 'none' }}>
                            <Card className='card' style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={tvShows.imageUrl} />
                                <Card.Body className='card-body'>
                                    <Card.Title>{tvShows.title}</Card.Title>
                                    <Card.Text>{tvShows.genre}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>

                    ))}
                </div>
            </div>
        </div>
    )
}