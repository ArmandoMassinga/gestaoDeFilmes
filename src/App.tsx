import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Listing from "pages/Listing";
import Form from "pages/Form";
import Navbar from "components/Navbar";
import AddMoviePage from "pages/AddMoviePage/AddMoviePage";
import MovieListPage from "pages/MovieListPage/MovieListPage";
import PrivateRoute from "components/PrivateRoute";
import LoginPage from "pages/LoginPage/LoginPage";
import './index.css';
import CreateUserPage from "pages/CreateUser/CreateUSer";

function App() {
  return (
    <div className="main-container">
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Página de Login */}
          <Route path="/" element={<LoginPage />} />

          {/* Rotas protegidas */}
          <Route
            path="/movies"
            element={
              <PrivateRoute>
                <MovieListPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/add"
            element={
              <PrivateRoute>
                <AddMoviePage />
              </PrivateRoute>
            }
          />

          <Route
            path="/listing"
            element={
              <Listing />
            }
          />

          <Route
            path="/registerUser"
            element={
              <CreateUserPage />
            }
          />

          <Route
            path="/form/:movieId"
            element={
              <Form />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
