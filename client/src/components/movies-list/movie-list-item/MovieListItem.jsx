import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom"


export default function MovieListItem({
    _id,
    title,
    imageUrl,
    genre
}) {
    return (
        <Card className='card' style={{ width: '18rem' }}>
            <Card.Img variant="top" src={imageUrl} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{genre}</Card.Text>
                <Link to={`/movies/${_id}`} className='details-button'><Button variant="primary">Details</Button></Link>
            </Card.Body>
        </Card>
    )
}