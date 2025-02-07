import React, { useEffect, useState } from "react";
import { getMovies } from "services/api"; // Importando a função correta
import MovieCard from "components/MovieCard";
import Pagination from "components/Pagination";

// Interface para tipagem dos filmes
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

function Listing() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getMovies();
        setMovies(response.data); // Pegando os dados da resposta
      } catch (err) {
        setError("Erro ao buscar filmes");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      <Pagination />

      <div className="container">
        <div className="row">
          {loading ? (
            <p>Carregando filmes...</p>
          ) : error ? (
            <p>{error}</p>
          ) : movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.id} className="col-sm-6 col-lg-4 col-xl-3 mb-3">
                <MovieCard movie={movie} />
              </div>
            ))
          ) : (
            <p>Nenhum filme encontrado.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Listing;








// import MovieCard from "components/MovieCard";
// import Pagination from "components/Pagination";

// function Listing() {
//   return (
//     <>
//       <Pagination />

//       <div className="container">
//         <div className="row">
//           <div className="col-sm-6 col-lg-4 col-xl-3 mb-3">
//             <MovieCard />
//           </div>
//           <div className="col-sm-6 col-lg-4 col-xl-3 mb-3">
//             <MovieCard />
//           </div>
//           <div className="col-sm-6 col-lg-4 col-xl-3 mb-3">
//             <MovieCard />
//           </div>
//           <div className="col-sm-6 col-lg-4 col-xl-3 mb-3">
//             <MovieCard />
//           </div>
//           <div className="col-sm-6 col-lg-4 col-xl-3 mb-3">
//             <MovieCard />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Listing;
