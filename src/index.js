import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import CadastroUsuario from "./Pages/Usuario/Cadastro/Cadastro";
import Login from "./Pages/Usuario/Login/Login";
import Perfil from "./Pages/Usuario/Perfil/Perfil";
import FilmeAssistido from "./Pages/Usuario/Assistido/Assistido";
import Home from "./Pages/Home/Home";
import ListaFilme from "./Pages/Filme/Lista/Lista";
import DetalhesFilme from "./Pages/Filme/Detalhes/Detalhes";
import CadastrarFilme from "./Pages/Filme/Cadastro/Cadastro";
import EditarFilme from "./Pages/Filme/Editar/Editar";
import Navbar from "./Components/Navbar/Navbar";
import axios from "axios";

import { BrowserRouter, Routes, Route } from "react-router-dom";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND;
axios.defaults.headers.post["Content-Type"] = "application/json";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usuario/cadastro" element={<CadastroUsuario />} />
        <Route path="/usuario/login" element={<Login />} />
        <Route path="/usuario/perfil" element={<Perfil />} />
        <Route path="/usuario/assistido" element={<FilmeAssistido />} />
        <Route path="/filme/lista" element={<ListaFilme />} />
        <Route path="/filme/detalhes" element={<DetalhesFilme />} />
        <Route path="/filme/cadastro" element={<CadastrarFilme />} />
        <Route path="/filme/editar" element={<EditarFilme />} />
      </Routes>     
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
