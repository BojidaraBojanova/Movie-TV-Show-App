import { Routes, Route } from 'react-router-dom';

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from './components/home/Home';
import '../public/styles/styles.css'

function App() {

  return (
    <div>
      <Header/>

      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>

      <Footer/>
    </div>
  )
}

export default App
