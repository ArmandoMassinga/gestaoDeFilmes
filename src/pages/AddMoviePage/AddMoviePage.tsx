import React, { useState } from "react";
import { createMovie } from "../../services/api";
import { useNavigate } from "react-router-dom";

const AddMoviePage = () => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // await createMovie({ title, genre });
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título" />
      <input value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="Gênero" />
      <button type="submit">Adicionar Filme</button>
    </form>
  );
};

export default AddMoviePage;
