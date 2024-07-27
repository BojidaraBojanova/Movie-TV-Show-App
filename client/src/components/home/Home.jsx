import Slideshow from "./Slideshow";
import TopMovies from "./TopMovies";

export default function Home(){
    return(
        <>
            <Slideshow/>
            <TopMovies title='Highest Rated'/>
            <TopMovies title='Last Added'/>
        </>
    )
}