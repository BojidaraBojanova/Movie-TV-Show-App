
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useNavigate } from 'react-router-dom';
import * as tvShowService from '../../services/tvShowService'

export default function TvShowCreate() {

    const navigate = useNavigate();

    const addTvShowSubmitHandler = async (e) => {
       e.preventDefault();
       
        const tvShowData = Object.fromEntries(new FormData(e.currentTarget));
        const authData = JSON.parse(localStorage.getItem('auth'));
        const userId = authData._id;


        try{
            await tvShowService.add({...tvShowData, userId});
    
            navigate('/tvShows');
        }catch(err){
            console.log(err);
        }
    
    }

    
    return (
        <div className='form-wrapper'>
            <h1>Add a TV-Show</h1>
            <Form className='form-container' onSubmit={addTvShowSubmitHandler}>
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" className='input' name='title' placeholder="Enter the title of the TV-Show" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>Director</Form.Label>
                    <Form.Control type="text" className='input' name='director' placeholder="Enter the name of the director" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>Writer</Form.Label>
                    <Form.Control type="text" className='input' name='writer' placeholder="Enter the name of the writer" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>Actors</Form.Label>
                    <Form.Control type="text" className='input' name='actors' placeholder="Separate actors with commas" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>Genre</Form.Label>
                    <Form.Control type="text" className='input' name='genre' placeholder="Separate genres with commas" />
                </Form.Group>

                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" name="description" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control type="text" className='input' name='imageUrl' />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>Trailer URL</Form.Label>
                    <Form.Control type="text" className='input' name='trailerUrl' />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>Release Date</Form.Label>
                    <Form.Control type="date" className='input' name='releaseDate' />
                </Form.Group>

                <Button type="submit" className='login-btn'>
                    Add TV-Show
                </Button>

            </Form>
        </div>
    )
}