
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Slideshow from "./components/home/Slideshow";
import '../public/styles/styles.css'

const images = [
  'https://www.vintagemovieposters.co.uk/wp-content/uploads/2023/03/IMG_1887-scaled.jpeg',
  'https://www.indiewire.com/wp-content/uploads/2019/12/us-1.jpg?w=758',
  'https://creativereview.imgix.net/content/uploads/2023/12/Oppenheimer.jpg?auto=compress,format&q=60&w=1263&h=2000',
  'https://m.media-amazon.com/images/M/MV5BM2QzMGVkNjUtN2Y4Yi00ODMwLTg3YzktYzUxYjJlNjFjNDY1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg'

]

function App() {

  return (
    <div>
      <Header/>
        <Slideshow images={images} delay={3000}/>
      <Footer/>
    </div>
  )
}

export default App
