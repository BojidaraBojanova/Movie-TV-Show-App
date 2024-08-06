import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as searchService from '../../../services/searchService'
import Loader from '../../loader/Loader';
import { useNavigate } from 'react-router-dom';

export default function Search() {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState({movies: [], tvShows: []});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        try {
            navigate(`/search?q=${query}`);
            setQuery('');
        } catch (error) {
            setError('Error searching for movies and TV shows');
        } finally {
            setLoading(false);
        }
    }

    if(loading){
        return <Loader/>
    }

    return (
        <>
            <Form className="d-flex">
                <Form.Control
                    type="text"
                    placeholder="Search"
                    className="me-2 search-input"
                    aria-label="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Button className='btn-search' onClick={handleSearch}>Search</Button>
            </Form>
        </>
    )
}