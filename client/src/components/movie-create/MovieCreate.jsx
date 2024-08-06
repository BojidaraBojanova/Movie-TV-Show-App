import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useNavigate } from 'react-router-dom';
import * as movieService from '../../services/movieService'
import { useState } from 'react';

export default function MovieCreate() {

    const navigate = useNavigate();
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

    const addMovieSubmitHandler = async (e) => {
       e.preventDefault();
       
        const movieData = Object.fromEntries(new FormData(e.currentTarget));
        const authData = JSON.parse(localStorage.getItem('auth'));
        const userId = authData._id;
        const validationErrors = validate(movieData);

        if(Object.keys(validationErrors).length > 0){
            setErrors(validationErrors);
            return;
        }

        try{
            await movieService.add({...movieData, userId});
    
            navigate('/movies');
        }catch(err){
            console.log(err);
        }
    
    }

    
    return (
        <div className='form-wrapper'>
            <h1>Add a Movie</h1>
            <Form className='form-container' onSubmit={addMovieSubmitHandler}>
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" className='input' name='title' placeholder="Enter the title of the movie" isInvalid={!!errors.title} />
                    <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>Director</Form.Label>
                    <Form.Control type="text" className='input' name='director' placeholder="Enter the name of the film's director" isInvalid={!!errors.director} />
                    <Form.Control.Feedback type="invalid">{errors.director}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>Writer</Form.Label>
                    <Form.Control type="text" className='input' name='writer' placeholder="Enter the name of the film's writer" isInvalid={!!errors.writer} />
                    <Form.Control.Feedback type="invalid">{errors.writer}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>Actors</Form.Label>
                    <Form.Control type="text" className='input' name='actors' placeholder="Separate actors with commas" isInvalid={!!errors.actors}/>
                    <Form.Control.Feedback type="invalid">{errors.actors}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>Genre</Form.Label>
                    <Form.Control type="text" className='input' name='genre' placeholder="Separate genres with commas" isInvalid={!!errors.genre}/>
                    <Form.Control.Feedback type="invalid">{errors.genre}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" name="description" isInvalid={!!errors.description}/>
                    <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control type="text" className='input' name='imageUrl' isInvalid={!!errors.imageUrl}/>
                    <Form.Control.Feedback type="invalid">{errors.imageUrl}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>Trailer URL</Form.Label>
                    <Form.Control type="text" className='input' name='trailerUrl' isInvalid={!!errors.trailerUrl}/>
                    <Form.Control.Feedback type="invalid">{errors.trailerUrl}</Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>Release Date</Form.Label>
                    <Form.Control type="date" className='input' name='releaseDate'/>
                </Form.Group>

                <Button type="submit" className='login-btn'>
                    Add Movie
                </Button>

            </Form>
        </div>
    )
}