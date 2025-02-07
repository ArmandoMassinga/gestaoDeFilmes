// src/services/api.ts

import axios from "axios";

// Configuração base da API
const api = axios.create({
  baseURL: "http://localhost:8080/api/movies",
});

const API_URL_GET_MOVIE = "http://localhost:8080/api/movies/getMovies"; // Ajuste a URL para o seu backend


const API_URL = "http://localhost:8080/api/users";

// Definição de tipos para melhor tipagem
interface Movie {
  id?: number;
  title: string;
  director: string;
  releaseDate: string;
  genre: string;
  year: number;  // Altere para 'number' para combinar com a definição de MovieListPage.tsx
  cast?: string[];
  synopsis?: string;
  rating?: number;
}

// Funções de manipulação de filmes
export const getMovies = async () => {
  try {
    const response = await axios.get(API_URL_GET_MOVIE);

    console.log("LISOKOKDS", response)
    return response; // Retorna a resposta completa, incluindo 'data'
  } catch (error) {
    throw new Error("Erro ao buscar filmes: " + error);
  }
};


export const createMovie = (movie: FormData) => api.post("/create", movie);
export const deleteMovie = (id: number) => api.delete(`/${id}`);
export const updateMovie = (id: number, movie: FormData) => api.put(`/${id}`, movie);

// export const deleteMovie = async (id: string) => {
//   try {
//     await api.delete(`/${id}`);
//     return true; // Retorna 'true' se o filme for deletado com sucesso
//   } catch (error) {
//     throw new Error("Erro ao deletar filme: " + error);
//   }
// };




// Função de login com tipagem correta
export const login = async (username: string, password: string): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data; // Retorna os dados do usuário autenticado
  } catch (error: any) {
    throw error.response?.data || "Erro ao conectar ao servidor";
  }
};

export const createUser = async (
  username: string,
  password: string,
  accessLevel: string
) => {
  try {
    const response = await axios.post(`${API_URL}/create`, {
      username,
      password,
      accessLevel,
    });
    return response.data;
  } catch (error) {
    throw new Error("Erro ao criar usuário");
  }
};
