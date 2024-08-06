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
    const [errors, setErrors] = useState({});

    const validate = (movieData) => {
        const errors = {};

        if(!movieData.title) errors.title = 'Title is required';
        if(!movieData.director) errors.director = 'Director is required';
        if(!movieData.writer) errors.writer = 'Writer is required';
        if(!movieData.actors) errors.actors = 'Actors is required';
        if(!movieData.genre) errors.genre = 'Genre is required';
        if(!movieData.description) errors.description = 'Description is required';
        if(!movieData.imageUrl) errors.imageUrl = 'Image URL is required';
        if(!movieData.trailerUrl) errors.trailerUrl = 'Trailer Url is required';
        
        return errors;
    }


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
        const validationErrors = validate(values);

        if(Object.keys(validationErrors).length > 0){
            setErrors(validationErrors);
            return;
        }

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
                    <Form.Control type="text" className='input' name='title' placeholder="Enter the title of the Movie" value={movie.title} onChange={onChange} isInvalid={!!errors.title} />
                    <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>Director</Form.Label>
                    <Form.Control type="text" className='input' name='director' placeholder="Enter the name of the director" value={movie.director} onChange={onChange} isInvalid={!!errors.director} />
                    <Form.Control.Feedback type="invalid">{errors.director}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>Writer</Form.Label>
                    <Form.Control type="text" className='input' name='writer' placeholder="Enter the name of the film's writer" value={movie.writer} onChange={onChange} isInvalid={!!errors.writer} />
                    <Form.Control.Feedback type="invalid">{errors.writer}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>Actors</Form.Label>
                    <Form.Control type="text" className='input' name='actors' placeholder="Separate actors with commas" value={movie.actors} onChange={onChange} isInvalid={!!errors.actors}/>
                    <Form.Control.Feedback type="invalid">{errors.actors}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>Genre</Form.Label>
                    <Form.Control type="text" className='input' name='genre' placeholder="Separate genres with commas" value={movie.genre} onChange={onChange} isInvalid={!!errors.genre}/>
                    <Form.Control.Feedback type="invalid">{errors.genre}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" name="description" value={movie.description} onChange={onChange} isInvalid={!!errors.description}/>
                    <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control type="text" className='input' name='imageUrl' value={movie.imageUrl} onChange={onChange} isInvalid={!!errors.imageUrl}/>
                    <Form.Control.Feedback type="invalid">{errors.imageUrl}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>Trailer URL</Form.Label>
                    <Form.Control type="text" className='input' name='trailerUrl' value={movie.trailerUrl} onChange={onChange} isInvalid={!!errors.trailerUrl}/>
                    <Form.Control.Feedback type="invalid">{errors.trailerUrl}</Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>Release Date</Form.Label>
                    <Form.Control type="date" className='input' name='releaseDate' value={movie.releaseDate} onChange={onChange}/>
                </Form.Group>

                <Button type="submit" className='login-btn'>
                    Edit Movie
                </Button>

            </Form>
        </div>
    )
}