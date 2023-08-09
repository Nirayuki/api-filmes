import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { apiKey } from "../../config/key"
import { Container } from "./styles"


function Details() {

    const { id } = useParams()

    const [movie, setMovie] = useState({})
    const image_path = 'https://image.tmdb.org/t/p/w500'

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `${apiKey}`
            }
        };
        fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US&page=1`, options)
            .then(response => response.json())
            .then(data => {

                const movie = {
                    id,
                    title: data.title,
                    sinopse: data.overview,
                    image: `${image_path}${data.poster_path}`,
                    releaseDate: data.release_date
                }
                setMovie(movie)
            })
    }, [id])

    return (
        <Container>
            <div className="movie">
                <img src={movie.image} alt={movie.sinopse} />
                <div className="details" >
                    <h1>{movie.title}</h1>
                    <span>Sinopse: {movie.sinopse}</span>
                    <span className="release-date" >Release date: {movie.releaseDate}</span>
                    <div className="botoes" >
                        <Link to="/" ><button>Go Back</button></Link>
                        <Link to="/"><button>Assistir</button></Link>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Details