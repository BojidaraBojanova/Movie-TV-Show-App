import { useEffect, useState } from "react";
import Slideshow from "./Slideshow";
import TopRatedMovies from "./TopRatedMovies";
import Loader from "../loader/Loader";
import TopNewestTvShows from "./TopNewestTvShows";
import useScrollToTop from "../scrollToTop";

export default function Home(){
    const [loading, setLoading] = useState(true);

    useScrollToTop();


    useEffect(() => {
        const fetchData = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 2000))

                setLoading(false)
            } catch (error) {
                console.error('Error fetching data', error);
                setLoading(false);
            }
        }

        fetchData();
    }, [])

    if(loading){
        return <Loader />
    }

    return(
        <>
            <Slideshow/>
            <TopRatedMovies/>
            <TopNewestTvShows/>
        </>
    )
}