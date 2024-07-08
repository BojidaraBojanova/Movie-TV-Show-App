import { useEffect, useState } from "react"

export default function Slideshow({
    images,
    delay = 3000
}){
    const [index, setIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    useEffect(() => {
        let intervalId;

        if(isPlaying){
            intervalId = setInterval(() => {
                setIndex((prevIndex) => (prevIndex + 1) % images.length);
            }, delay);

        }
        return () => clearInterval(intervalId);
    }, [isPlaying, images.length, delay]);

    const goToPreviousSlide = () => {
        setIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
        setIsPlaying(false);
    };

    const goToNextSlide = () => {
        setIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsPlaying(false);
    };

    return(
        <div className="slideshow">
            <div className="slideshow-background" style={{ backgroundImage: `url(${images[index]})` }}></div>
            <div className="slide">
                <img src={images[index]} alt={`Slide ${index + 1}`} />
            </div>
        </div>
    )
}