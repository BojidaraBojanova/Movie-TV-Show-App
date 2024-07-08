import { Routes, Route } from 'react-router-dom';

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from './components/home/Home';
import Movies from "./components/movies-list/Movies"
import TvShows from './components/tvShows-list/TvShows';
import User from './components/user-page/User';
import Login from './components/login/Login';
import Registration from './components/registration/Registration';
import '../public/styles/styles.css'


function App() {

  return (
    <div>
      <Header/>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/movies' element={<Movies/>}/>
        <Route path='/tvShows' element={<TvShows/>}/>
        <Route path='/user' element={<User/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/registration' element={<Registration/>}/>
      </Routes>

      <Footer/>
    </div>
  )
}

export default App
