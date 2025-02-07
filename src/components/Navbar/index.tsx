import React from "react";
import { ReactComponent as GithubIcon } from "assets/img/github.svg";
import './style.css';

function Navbar() {
  const handleLogout = () => {
    // Remover credenciais de autenticação, por exemplo:
    localStorage.removeItem("authToken");  // Se estiver usando localStorage
    sessionStorage.removeItem("authToken");  // Se estiver usando sessionStorage
    // Ou qualquer outro processo para limpar o estado de autenticação

    // Redirecionar o usuário para a página de login ou inicial
    window.location.href = "/";  // Ou qualquer rota de sua escolha
  };

  return (
    <header className="navbar">
      <nav className="container">
        <div className="nav-content">
          <h1 className="logo">Gestão de Filmes</h1>
          <a 
            href="https://github.com/osjotamo/projectofinal/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="github-link"
          >
            <div className="contact-container">
              <GithubIcon className="github-icon" />
              <p className="contact-link">/Armando Massinga</p>
            </div>
          </a>
          
          <button className="logout-btn" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
