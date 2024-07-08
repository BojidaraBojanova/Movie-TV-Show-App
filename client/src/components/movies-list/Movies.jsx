import CardMovie from '../CardMovie'

export default function Movies(){
    return(
        <div className='movie-show-wrapper'>
            <h1>Movies</h1>
            <div className="movies-show-library-container">
                <CardMovie/>
                <CardMovie/>
                <CardMovie/>
                <CardMovie/>
                <CardMovie/>
                <CardMovie/>
                <CardMovie/>
                <CardMovie/>
                <CardMovie/>
                <CardMovie/>
                <CardMovie/>
                <CardMovie/>
            </div>
        </div>
    )
}