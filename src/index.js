import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Cadastro from "./Pages/Cadastro/Cadastro";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import Filme from "./Pages/Filme/Filme";
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
        <Route path="/login" element={<Login />} />
        <Route path="/filme" element={<Filme />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
