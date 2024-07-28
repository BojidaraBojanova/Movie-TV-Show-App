import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import * as tvShowService from '../../services/tvShowService';
export default function TvShowEdit(){

    const navigate = useNavigate();
    const { tvShowId } = useParams();
    const [tvShow, setTvShow] = useState({
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
        tvShowService.getOne(tvShowId)
            .then(result => {
            if(result.releaseDate){
                result.releaseDate = new Date(result.releaseDate).toISOString().split('T')[0];
            }
                setTvShow(result);
            });
    }, [tvShowId])

    const editTvShowSubmitHandler = async (e) => {
        e.preventDefault();

        const values = Object.fromEntries(new FormData(e.currentTarget));

        try{
            await tvShowService.edit(tvShowId, values);

            navigate('/tvShows');
        }catch(err){
            console.log(err)
        }
    }

    const onChange = (e) => {
        setTvShow(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }


    return(
        <div className='form-wrapper'>
            <h1>Edit a TV-Show</h1>
            <Form className='form-container' onSubmit={editTvShowSubmitHandler}>
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" className='input' name='title' placeholder="Enter the title of the TV-Show" value={tvShow.title} onChange={onChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>Director</Form.Label>
                    <Form.Control type="text" className='input' name='director' placeholder="Enter the name of the director" value={tvShow.director} onChange={onChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>Writer</Form.Label>
                    <Form.Control type="text" className='input' name='writer' placeholder="Enter the name of the writer" value={tvShow.writer} onChange={onChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>Actors</Form.Label>
                    <Form.Control type="text" className='input' name='actors' placeholder="Separate actors with commas" value={tvShow.actors} onChange={onChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>Genre</Form.Label>
                    <Form.Control type="text" className='input' name='genre' placeholder="Separate genres with commas" value={tvShow.genre} onChange={onChange}/>
                </Form.Group>

                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" name="description" value={tvShow.description} onChange={onChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control type="text" className='input' name='imageUrl' value={tvShow.imageUrl} onChange={onChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>Trailer URL</Form.Label>
                    <Form.Control type="text" className='input' name='trailerUrl' value={tvShow.trailerUrl} onChange={onChange} />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>Release Date</Form.Label>
                    <Form.Control type="date" className='input' name='releaseDate' value={tvShow.releaseDate} onChange={onChange}/>
                </Form.Group>

                <Button type="submit" className='login-btn'>
                    Edit TV-Show
                </Button>

            </Form>
        </div>
    )
}