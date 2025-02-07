import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./style.css";

function Form() {
  const { movieId } = useParams(); // Use a chave correta conforme a rota configurada
  const [movie, setMovie] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [score, setScore] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  // Lógica para buscar o filme da API
  useEffect(() => {
    console.log("ID do filme:", movieId); // Verifique se o id está sendo capturado corretamente

    const fetchMovie = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/movies/${movieId}`);
        if (!response.ok) {
          throw new Error("Filme não encontrado");
        }
        const data = await response.json();
        setMovie(data); // Atualiza o estado com os dados do filme
      } catch (error) {
        setError("Erro ao carregar os dados do filme. Tente novamente mais tarde.");
        console.error("Erro ao buscar filme:", error);
      }
    };

    if (movieId) {
      fetchMovie();
    }
  }, [movieId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Avaliação:", score);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!movie) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="dsmovie-form-container">
      <img
        className="dsmovie-movie-card-image"
        src={`https://image.tmdb.org/t/p/w533_and_h300_bestv2${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="dsmovie-card-bottom-container">
        <h3>{movie.title}</h3>
        <p>{movie.overview}</p>
        <p><strong>Lançamento:</strong> {movie.release_date}</p>
        <p><strong>Pontuação Média:</strong> {movie.vote_average}</p>
        <p><strong>Gêneros:</strong> {movie.genres?.map((genre: any) => genre.name).join(", ") || "N/A"}</p>
        
        <form className="dsmovie-form" onSubmit={handleSubmit}>
          <div className="form-group dsmovie-form-group">
            <label htmlFor="email">Informe seu email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group dsmovie-form-group">
            <label htmlFor="score">Informe sua avaliação</label>
            <select
              className="form-control"
              id="score"
              value={score}
              onChange={(e) => setScore(Number(e.target.value))}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
          <div className="dsmovie-form-btn-container">
            <button type="submit" className="btn btn-primary dsmovie-btn">
              Salvar
            </button>
          </div>
        </form>
        <Link to="/">
          <button className="btn btn-primary dsmovie-btn mt-3">Cancelar</button>
        </Link>
      </div>
    </div>
  );
}

export default Form;
