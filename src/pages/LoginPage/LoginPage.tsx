import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Importa SweetAlert2
import Skeleton from "react-loading-skeleton"; // Importa Skeleton Loader
import "react-loading-skeleton/dist/skeleton.css"; // Estilos do Skeleton
import { login } from "../../services/api"; // Importa a função de login
import { Link } from "react-router-dom"; // Importa o Link do react-router-dom
import "./LoginPage.css";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Estado para controle do loading
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Ativa o loading

    try {
      const userData = await login(username, password);
      localStorage.setItem("auth", JSON.stringify(userData)); // Guarda os dados do usuário

      Swal.fire({
        title: "Login realizado!",
        text: "Bem-vindo ao sistema!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      // Verifica o nível de acesso do usuário e redireciona para a página apropriada
      const accessLevel = userData.accessLevel;

      console.log("USER_DATA", userData)

      console.log("ACESS_LEVEL", accessLevel)
      if (accessLevel === "admin") {
        setTimeout(() => navigate("/movies"), 2000); // Redireciona para a página de administrador
      } else if (accessLevel === "user") {
        setTimeout(() => navigate("/listing"), 2000); // Redireciona para a página do usuário comum
      } else {
        setTimeout(() => navigate("/movies"), 2000); // Caso não tenha um acesso específico
      }

    } catch (error) {
      Swal.fire({
        title: "Erro",
        text: error instanceof Error ? error.message : "Usuário ou senha inválidos!",
        icon: "error",
      });
    } finally {
      setLoading(false); // Desativa o loading
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Gestão de Filmes</h1>
        <p>Gerencie e descubra os melhores filmes!</p>
        <form onSubmit={handleLogin}>
          {loading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
            </div>
          ) : (
            <>
              <input
                type="text"
                placeholder="Usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? "Aguarde..." : "Entrar"}
              </button>
            </>
          )}
        </form>
        <div className="register-link">
          <p>Ainda não tem conta? <Link to="/registerUser">Criar conta</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
