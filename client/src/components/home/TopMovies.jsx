//import CardMovie from '../CardMovie';

export default function TopMovies({
    title
}){
    return(
        <div className='movies-wrapper'>
            <h2>Top 5 {title} Movies</h2>
            <div className="movies-container">
                {/* <CardMovie/>
                <CardMovie/>
                <CardMovie/>
                <CardMovie/>
                <CardMovie/> */}
            </div>
        </div>
    )
}