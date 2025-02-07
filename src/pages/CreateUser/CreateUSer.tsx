import React, { useState } from "react";
import Swal from "sweetalert2"; // Importa SweetAlert2
import { useNavigate } from "react-router-dom";
import { createUser } from "../../services/api"; // Função para criar o usuário
import "./CreateUserPage.css"; // Importe o CSS adequado

const CreateUserPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [accessLevel, setAccessLevel] = useState<string>("user"); // Definindo o nível de acesso
  const [loading, setLoading] = useState<boolean>(false); // Estado para controle do loading
  const navigate = useNavigate();

  const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Exibe um popup de confirmação antes de criar o usuário
    const result = await Swal.fire({
      title: "Você tem certeza?",
      text: "Deseja realmente criar esse usuário?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, criar!",
      cancelButtonText: "Cancelar",
    });

    // Se o usuário confirmar, prossegue com a criação
    if (result.isConfirmed) {
      setLoading(true); // Ativa o loading

      try {
        const userData = await createUser(username, password, accessLevel);
        Swal.fire({
          title: "Usuário criado com sucesso!",
          text: "Agora você pode fazer login.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        // Redirecionamento após o sucesso
        setTimeout(() => {
          navigate("/");
        }, 2500);
      } catch (error) {
        Swal.fire({
          title: "Erro",
          text: error instanceof Error ? error.message : "Erro ao criar o usuário!",
          icon: "error",
          showConfirmButton: true,
        });
      } finally {
        setLoading(false); // Desativa o loading
      }
    }
  };

  return (
    <div className="create-user-container">
      <div className="create-user-box">
        <h1>Criar Novo Usuário</h1>
        <form onSubmit={handleCreateUser}>
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
                placeholder="Nome de Usuário"
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
              <select
                value={accessLevel}
                onChange={(e) => setAccessLevel(e.target.value)}
              >
                <option value="user">Usuário</option>
                <option value="admin">Administrador</option>
              </select>
              <button type="submit" disabled={loading}>
                {loading ? "Criando..." : "Criar Usuário"}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateUserPage;
