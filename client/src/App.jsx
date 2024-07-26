import { Routes, Route } from 'react-router-dom';

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from './components/home/Home';
import Movies from "./components/movies-list/Movies"
import TvShows from './components/tvShows-list/TvShows';
import User from './components/user-page/User';
import Login from './components/login/Login';
import Registration from './components/registration/Registration';
import MovieDetails from './components/movie-details/MovieDetails';
import '../public/styles/styles.css'
import { AuthProvider } from './contexts/authContext';
import Path from './paths';
import TvShowDetails from './components/tvShow-details/TvShowDetails';
import MovieCreate from './components/movie-create/MovieCreate';
import MovieEdit from './components/movie-edit/MovieEdit';
import TvShowCreate from './components/tvShow-create/TvShowCreate';
import TvShowEdit from './components/tvShow-edit/TvShowEdit';
import Logout from './components/logout/Logout';
import AuthGuard from './guards/AuthGuard';


function App() {

  return (
    <AuthProvider>
      <Header/>
      <Routes>
        <Route path={Path.Home} element={<Home />} />
        <Route path='/movies' element={<Movies/>} />
        <Route path='/tvShows' element={<TvShows/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/movies/:movieId' element={<MovieDetails />} />
        <Route path='/tvShows/:tvShowId' element={<TvShowDetails />} />

        <Route element={<AuthGuard/>}>
          <Route path='/user' element={<User/>}/>
          <Route path='/movie/create' element={<MovieCreate/>} />
          <Route path={Path.MovieEdit} element={<MovieEdit />} />
          <Route path='/tvShow/create' element={<TvShowCreate />} />
          <Route path={Path.SerialEdit} element={<TvShowEdit />} />
          <Route path={Path.Logout} element={<Logout/>} />
        </Route>
      </Routes>
      <Footer/>
    </AuthProvider>
  )
}

export default App
