import React, { useEffect, useState } from "react";
import { getMovies, deleteMovie, createMovie, updateMovie } from "../../services/api";
import Swal from "sweetalert2";
import "./MovieListPage.css";

interface Movie {
  id?: number;
  title: string;
  genre: string;
  year: string;
  director: string;
  cast: string;
  synopsis: string;
  rating: number;
  file?: string | File | null; // Permitir tanto base64 (string) quanto File
}

// Função para converter o arquivo em base64
const convertToBase64 = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const MovieListPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newMovie, setNewMovie] = useState<Movie>({
    id: 0,
    title: "",
    genre: "",
    year: "",
    director: "",
    cast: "",
    synopsis: "",
    rating: 0,
    file: null,
  });

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await getMovies();
      setMovies(response.data); // Agora 'response.data' será do tipo Movie[]
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    }
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Você tem certeza?",
      text: "Você não poderá reverter essa ação!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sim, excluir!",
    });

    if (result.isConfirmed) {
      try {
        await deleteMovie(id);
        fetchMovies();
        Swal.fire("Excluído!", "O filme foi excluído com sucesso.", "success");
      } catch (error) {
        Swal.fire("Erro!", "Ocorreu um erro ao excluir o filme.", "error");
      }
    }
  };

  const handleAddMovie = async () => {
    const formData = new FormData();

    // Adiciona as informações do filme
    Object.keys(newMovie).forEach(async (key) => {
      const value = newMovie[key as keyof Movie];
      if (value !== null && value !== undefined) {
        if (typeof value === "string" || typeof value === "number") {
          formData.append(key, String(value));
        } else if (value instanceof File) { // Verificação explícita para File
          // Converte a imagem para base64 e envia
          const base64Image = await convertToBase64(value);
          formData.append("file", base64Image);
        }
      }
    });

    try {
      await createMovie(formData);
      setShowModal(false);
      Swal.fire("Sucesso!", "O filme foi adicionado com sucesso.", "success");
      fetchMovies(); // Atualiza a lista de filmes após adicionar um novo
    } catch (error) {
      Swal.fire("Erro!", "Ocorreu um erro ao adicionar o filme.", "error");
    }
  };

  const handleEditMovie = async () => {
    const formData = new FormData();

    // Adiciona as informações do filme
    Object.keys(newMovie).forEach(async (key) => {
      const value = newMovie[key as keyof Movie];
      if (value !== null && value !== undefined) {
        if (typeof value === "string" || typeof value === "number") {
          formData.append(key, String(value));
        } else if (value instanceof File) { // Verificação explícita para File
          // Converte a imagem para base64 e envia
          const base64Image = await convertToBase64(value);
          formData.append("file", base64Image);
        }
      }
    });

    try {
      await updateMovie(newMovie.id!, formData);
      fetchMovies();
      setShowModal(false);
      Swal.fire("Sucesso!", "O filme foi atualizado com sucesso.", "success");
    } catch (error) {
      Swal.fire("Erro!", "Ocorreu um erro ao atualizar o filme.", "error");
    }
  };

  return (
    <div className="movie-list-container">
      <h1>Lista de Filmes</h1>
      <button className="add-movie-btn" onClick={() => setShowModal(true)}>
        Adicionar Filme
      </button>

      <table className="movie-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Gênero</th>
            <th>Ano</th>
            <th>Diretor</th>
            <th>Elenco</th>
            <th>Sinopse</th>
            <th>Nota</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie: Movie) => (
            <tr key={movie.id}>
              <td>{movie.title}</td>
              <td>{movie.genre}</td>
              <td>{movie.year}</td>
              <td>{movie.director}</td>
              <td>{Array.isArray(movie.cast) ? movie.cast.join(", ") : movie.cast}</td>
              <td>{movie.synopsis}</td>
              <td>{movie.rating} / 10</td>
              <td>
                <button className="delete-btn" onClick={() => handleDelete(movie.id!)}>
                  Excluir
                </button>
                <button className="edit-btn" onClick={() => { setNewMovie(movie); setShowModal(true); }}>
                  Editar
                </button>
                {movie.file && (
                  <img 
                    src={typeof movie.file === "string" ? movie.file : `data:image/jpeg;base64,${movie.file}`} 
                    alt={movie.title} 
                    width="100" 
                    height="150"
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{newMovie.id ? "Editar Filme" : "Adicionar Filme"}</h2>

            <label>Título:
              <input
                type="text"
                value={newMovie.title}
                onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
              />
            </label>

            <label>Gênero:
              <select
                value={newMovie.genre}
                onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })}
              >
                <option value="comédia">Comédia</option>
                <option value="drama">Drama</option>
                <option value="ação">Ação</option>
                <option value="aventura">Aventura</option>
                <option value="romance">Romance</option>
                <option value="terror">Terror</option>
                <option value="ficção">Ficção Científica</option>
              </select>
            </label>

            <label>Ano:
              <input
                type="number"
                value={newMovie.year}
                onChange={(e) => setNewMovie({ ...newMovie, year: e.target.value })}
              />
            </label>

            <label>Diretor:
              <input
                type="text"
                value={newMovie.director}
                onChange={(e) => setNewMovie({ ...newMovie, director: e.target.value })}
              />
            </label>

            <label>Elenco:
              <input
                type="text"
                value={newMovie.cast}
                onChange={(e) => setNewMovie({ ...newMovie, cast: e.target.value })}
              />
            </label>

            <label>Sinopse:
              <textarea
                value={newMovie.synopsis}
                onChange={(e) => setNewMovie({ ...newMovie, synopsis: e.target.value })}
              />
            </label>

            <label>Nota:
              <input
                type="number"
                value={newMovie.rating}
                onChange={(e) => setNewMovie({ ...newMovie, rating: parseInt(e.target.value) })}
              />
            </label>

            <label>Arquivo:
              <input
                type="file"
                onChange={(e) => setNewMovie({ ...newMovie, file: e.target.files ? e.target.files[0] : null })}
              />
            </label>

            <button className="submit-btn" onClick={newMovie.id ? handleEditMovie : handleAddMovie}>
              {newMovie.id ? "Salvar Alterações" : "Adicionar Filme"}
            </button>

            <button className="cancel-btn" onClick={() => setShowModal(false)}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieListPage;
