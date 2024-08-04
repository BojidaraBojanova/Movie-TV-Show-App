import { useContext, useState, useEffect } from "react"
import AuthContext from "../../contexts/authContext"
import Nav from 'react-bootstrap/Nav';
import AddedMovies from "./addedMovies/AddedMovies";
import AddedTvShows from "./addedTvShows/AddedTvShows";
import Watchlist from "./watchlist/Watchlist";
import EditYourProfile from "./editYourProfile/EditYourProfile";
import * as watchListService from "../../services/watchListService";
import * as movieService from "../../services/movieService";
import * as tvShowService from "../../services/tvShowService";
import { useParams } from "react-router-dom";
import Loader from "../loader/Loader";


export default function User() {

    const { firstName, lastName, userId } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('addedMoviesTvShows');
    const [watchList, setWatchList] = useState([]);
    const [movies, setMovies] = useState([]);
    const [tvShow, setTvShows] = useState([]);
    const [loading, setLoading] = useState(true);


    const handleTabChange = (tab) => {
        setActiveTab(tab);
    }



    useEffect(() => {
        const fetchWatchList = async () => {
            try {

                const watchListResponse = await watchListService.getWatchList(userId);
                console.log('Watchlist Response:', watchListResponse); // Debug line
                
                if(watchListResponse.success){

                    const watchListItems = watchListResponse.watchList;
                    setWatchList(watchListItems)

                    const movieItems = watchListItems.filter(item => item.itemModel === 'Movie');
                    const tvShowItems = watchListItems.filter(item => item.itemModel === 'Series');

                    const movieDetailsPromises = movieItems.map(item =>
                        movieService.getOne(item.item)
                    );
                    const movieDetails = await Promise.all(movieDetailsPromises);
                    setMovies(movieDetails.filter(movie => movie !== null));

                    // Fetch TV show details
                    const tvShowDetailsPromises = tvShowItems.map(item =>
                        tvShowService.getOne(item.item)
                    );
                    const tvShowDetails = await Promise.all(tvShowDetailsPromises);
                    setTvShows(tvShowDetails.filter(tvShow => tvShow !== null));

                    // // const movieItems = watchListItems.filter(item => item.itemType === 'Movie')
                    // const tvShowItems = watchListItems.filter(item => item.itemModel === 'Series')

                    // const movieDetailsPromises = watchListItems.map(item => 
                    //     movieService.getOne(item.item)
                    // );

                    // const movieDetails = await Promise.all(movieDetailsPromises);
                    // console.log('Movie Details:', movieDetails)
                    // setMovies(movieDetails)

                    // const tvShowDetailsPromises = tvShowItems.map(item => 
                    //     tvShowService.getOne(item.item)
                    // )

                    // const tvShowDetails = await Promise.all(tvShowDetailsPromises);
                    // setTvShow(tvShowDetails)

                }else{
                    throw new Error('No watchlist data received');
                }

            } catch (error) {
                console.error('Error fetching Movie details and comments:', error);
            } finally{
                setLoading(false)
            }
        };

        if (userId) {
            fetchWatchList();
        }
    }, [userId]);

    const removeFromWatchList = async (itemId, itemType) => {

        try {
            if(itemType !== 'Movie' && itemType !== 'Series'){
                throw new Error('Invalid item type')
            }

            await watchListService.remove(userId, itemId, itemType);

            const updatedWatchList = watchList.filter(item => !(item.item === itemId && item.watchListModel === itemType))

            setWatchList(updatedWatchList);

            if(itemType === 'Movie'){
                const updatedMovies = movies.filter(movie => movie._id !== itemId);
                setMovies(updatedMovies);
            }else if(itemType === 'Series'){
                const updatedTvShows = tvShow.filter(tvShow => tvShow._id !== itemId);
                setTvShows(updatedTvShows)
            }
            // await watchListService.remove(userId, movieId, 'Movie')
            // const updatedWatchList = watchList.filter(item => item.item !== movieId);
            // setWatchList(updatedWatchList);
            // console.log(userId)
            // console.log(movieId)

            // const updatedMovies = movies.filter(movie => movie._id !== movieId);
            // setMovies(updatedMovies);
        } catch (error) {
            console.error('Error');
        }
    }

    if(loading){
        return <Loader/>
    }

    return (
        <div className="user-container">

            <div className="name-wrapper">
                <h1>{firstName} {lastName}</h1>
            </div>
            <div className="nav-wrapper">
                <Nav justify variant="tabs" activeKey={activeTab} onSelect={handleTabChange}>
                    <Nav.Item>
                        <Nav.Link eventKey="addedMoviesTvShows">Added Movies / Added TV-Shows</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="watchlist">Watchlist</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="editProfile">Edit Your Profile</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>

            {activeTab === 'addedMoviesTvShows' && (
                <div className="tab-content-wrapper">
                    <AddedMovies
                        show={true}
                        handleClose={() => setActiveTab('')}
                    />
                    <AddedTvShows />
                </div>
            )}

            {activeTab === 'watchlist' && (
                <div className="tab-content-wrapper">
                    <Watchlist 
                        show={true}
                        handleClose={() => setActiveTab('')}
                        userId = {userId}
                        watchlistMovies = {movies}
                        watchlistTvShows = {tvShow}
                        removeFromWatchList = {removeFromWatchList}

                    />
                </div>
            )}

            {activeTab === 'editProfile' && (
                <div className="tab-content-wrapper">
                    <EditYourProfile
                        show={true}
                        handleClose={() => setActiveTab('')}
                    />
                </div>
            )}

        </div>
    )
}