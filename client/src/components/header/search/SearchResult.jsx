import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as searchService from '../../../services/searchService';
import Loader from '../../loader/Loader';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom"

export default function SearchResults() {
    const location = useLocation();
    const [query, setQuery] = useState(new URLSearchParams(location.search).get('q') || '');
    const [result, setResult] = useState({ movies: [], tvShows: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const newQuery = params.get('q') || '';
        if (newQuery !== query) {
            setQuery(newQuery);
        }
    }, [location.search]);

    useEffect(() => {
        if (!query) return;

        const fetchResults = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await searchService.search(query);
                setResult(response);
            } catch (error) {
                setError('Error searching for movies and TV shows');
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [query]);
    
    console.log('result:', result)

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="search-wrapper">
            <h1>Search Results for "{query}"</h1>
            <div>
                <h2>Movies</h2>
                {result.movies.length > 0 ? (
                    <div className="movies-show-library-container">
                        {result.movies.map(movie => (
                            <Link to={`/movies/${movie._id}`} style={{ textDecoration: 'none' }} key={movie._id}>
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
                ) : (
                    <p className="not-found">No movies found</p>
                )}
            </div>
            <div>
                <h2>TV Shows</h2>
                {result.tvShows.length > 0 ? (
                    <div className="movies-show-library-container">
                        {result.tvShows.map(tvShow => (
                            <Link to={`/tvShows/${tvShow._id}`} style={{ textDecoration: 'none' }} key={tvShow._id}>
                            <Card className='card' style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={tvShow.imageUrl} />
                                <Card.Body className='card-body'>
                                    <Card.Title>{tvShow.title}</Card.Title>
                                    <Card.Text>{tvShow.genre}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                        ))}
                    </div>
                ) : (
                    <p className="not-found">No TV shows found</p>
                )}
            </div>
        </div>
    );
}
