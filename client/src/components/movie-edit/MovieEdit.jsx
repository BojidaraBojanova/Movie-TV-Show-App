import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import * as movieService from '../../services/movieService';

export default function MovieEdit() {

    const navigate = useNavigate();
    const { movieId } = useParams();
    const [movie, setMovie] = useState({
        title: '',
        director: '',
        writer: '',
        actors: '',
        genre: '',
        description: '',
        imageUrl: '',
        trailerUrl: '',
        releaseDate: '',
    });

    useEffect(() => {
        movieService.getOne(movieId)
            .then(result => {
                if (result.releaseDate) {
                    result.releaseDate = new Date(result.releaseDate).toISOString().split('T')[0];
                }
                setMovie(result);
            });
    }, [movieId])

    const editMovieSubmitHandler = async (e) => {
        e.preventDefault();

        const values = Object.fromEntries(new FormData(e.currentTarget));

        try {
            await movieService.edit(movieId, values);

            navigate('/movies');
        } catch (err) {
            console.log(err)
        }
    }

    const onChange = (e) => {
        setMovie(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div className='form-wrapper'>
            <h1>Edit a Movie</h1>
            <Form className='form-container' onSubmit={editMovieSubmitHandler}>
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" className='input' name='title' placeholder="Enter the title of the Movie" value={movie.title} onChange={onChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>Director</Form.Label>
                    <Form.Control type="text" className='input' name='director' placeholder="Enter the name of the director" value={movie.director} onChange={onChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>Writer</Form.Label>
                    <Form.Control type="text" className='input' name='writer' placeholder="Enter the name of the writer" value={movie.writer} onChange={onChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>Actors</Form.Label>
                    <Form.Control type="text" className='input' name='actors' placeholder="Separate actors with commas" value={movie.actors} onChange={onChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>Genre</Form.Label>
                    <Form.Control type="text" className='input' name='genre' placeholder="Separate genres with commas" value={movie.genre} onChange={onChange} />
                </Form.Group>

                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" name="description" value={movie.description} onChange={onChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control type="text" className='input' name='imageUrl' value={movie.imageUrl} onChange={onChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>Trailer URL</Form.Label>
                    <Form.Control type="text" className='input' name='trailerUrl' value={movie.trailerUrl} onChange={onChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>Release Date</Form.Label>
                    <Form.Control type="date" className='input' name='releaseDate' value={movie.releaseDate} onChange={onChange} />
                </Form.Group>

                <Button type="submit" className='login-btn'>
                    Edit Movie
                </Button>

            </Form>
        </div>
    )
}