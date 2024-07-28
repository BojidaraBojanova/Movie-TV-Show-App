import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom"


export default function MovieListItem({
    _id,
    title,
    imageUrl,
    genre
}) {
    return (
        <Link to={`/tvShows/${_id}`} style={{ textDecoration: 'none' }}>
            <Card className='card' style={{ width: '18rem' }}>
                <Card.Img variant="top" src={imageUrl} />
                <Card.Body className='card-body'>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>{genre}</Card.Text>
                </Card.Body>
            </Card>
        </Link>
        
    )
}