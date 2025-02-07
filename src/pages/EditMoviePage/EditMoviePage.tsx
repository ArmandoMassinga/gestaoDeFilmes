import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditMoviePage.css";

const EditMoviePage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de atualização
    console.log("Filme atualizado:", { movieId, title, description, imageUrl });
    alert("Filme atualizado com sucesso!");
    navigate("/movies");
  };

  return (
    <div className="edit-movie-container">
      <h1>Editar Filme</h1>
      <form onSubmit={handleUpdate} className="edit-movie-form">
        <label>Título</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
        
        <label>Descrição</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label>URL da Imagem</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
        
        <button type="submit">Atualizar</button>
      </form>
    </div>
  );
};

export default EditMoviePage;