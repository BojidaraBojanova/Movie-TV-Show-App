//import CardMovie from '../CardMovie';
import React, { useEffect, useState } from 'react';
import { getTopRatedMovies } from '../../services/movieService';
import Loader from '../loader/Loader';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'

export default function TopRatedMovies() {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopRatedMovies = async () => {
            try {
                const topMovies = await getTopRatedMovies();
                setMovies(topMovies);
                console.log(topMovies)
            } catch (error) {
                console.error('Error fetching top rated movies:', error);
            } finally {
                setLoading(false)
            }
        }

        fetchTopRatedMovies()
    }, [])

    if (loading) {
        return <Loader />
    }

    console.log(movies);

    return (
        <div className='movies-wrapper'>

            <div className="movies-container">
                <div className="title-wrapper">
                    <h2>Top 5 Rated Movies</h2>
                </div>
                <div className="items-wrapper">
                    {movies.map(movie => (
                        <Link to={`/movies/${movie._id}`} style={{ textDecoration: 'none' }}>
                            <Card className='card' style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={movie.imageUrl} />
                                <Card.Body className='card-body'>
                                    <Card.Title>{movie.title}</Card.Title>
                                    <Card.Text>{movie.genre}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>

                    ))}
                </div>

                {/* <CardMovie/>
                <CardMovie/>
                <CardMovie/>
                <CardMovie/>
                <CardMovie/> */}
            </div>
        </div>
    )
}