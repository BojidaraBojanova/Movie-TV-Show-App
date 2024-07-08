import { useEffect, useState } from "react"

export default function Slideshow({
    images,
    delay = 3000
}){
    const [index, setIndex] = useState(0);

    useEffect(() => {
        let intervalId = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, delay);
        
        return () => clearInterval(intervalId);
    }, [images.length, delay]);


    return(
        <div className="slideshow">
            <div className="slideshow-background" style={{ backgroundImage: `url(${images[index]})` }}></div>
            <div className="slide">
                <img src={images[index]} alt={`Slide ${index + 1}`} />
            </div>
        </div>
    )
}