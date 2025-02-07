import { Link } from "react-router-dom";
import { FaPlayCircle } from "react-icons/fa";
import MovieScore from "components/MovieScore";
import "./MovieCard.css";

interface Movie {
  id?: number;
  title: string;
  director: string;
  releaseDate: string;
  genre: string;
  year: number;
  cast?: string[];
  synopsis?: string;
  rating?: number;
}

function MovieCard({ movie }: { movie: Movie }) {
  return (
    <div className="movie-card">
      <div className="movie-image-container">
        <img className="movie-image" src="/default-movie.jpg" alt={movie.title} />
        <div className="overlay">
          <FaPlayCircle className="play-icon" />
        </div>
      </div>

      <div className="movie-info">
        <h3 className="movie-title">{movie.title} ({movie.year})</h3>
        <p className="movie-genre">{movie.genre}</p>
        <p className="movie-description">{movie.synopsis || "Sem descrição disponível."}</p>
        <MovieScore />
        <Link to={`/form/${movie.id}`}>
          <button className="btn-movie">Avaliar</button>
        </Link>
      </div>
    </div>
  );
}

export default MovieCard;
