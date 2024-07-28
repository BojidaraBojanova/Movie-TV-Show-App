import { Modal, Button } from 'react-bootstrap'
import { useState } from "react";

export default function RatingModal({
    show,
    handleClose,
    handleRate,
    title
}){
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

   const handleSubmit = () => {
        handleRate(rating);
        setRating(0);
        handleClose();
   }

    console.log(rating);

    return(
        <Modal show={show} onHide={handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>Rate this {title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="stars">
                {[...Array(10)].map((_, index) => (
                        <i className="fa-solid fa-star star"
                            key={index}
                            onClick={() => setRating(index + 1)}
                            onMouseEnter={() => setHover(index + 1)}
                            onMouseLeave={() => setHover(0)}
                            style={{ color: (index < (hover || rating)) ? "#ffc107" : "#e4e5e9" }}
                        ></i>
                    ))}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>Close</Button>
                <Button variant='primary' className='submit-rate-btn' onClick={handleSubmit}>Submit</Button>
            </Modal.Footer>
        </Modal>
    )
}