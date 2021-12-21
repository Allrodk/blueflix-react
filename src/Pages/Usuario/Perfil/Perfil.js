import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../../../Auth/Auth";
import "./Perfil.scss";
import axios from "axios";

export default function Perfil() {
  const navigate = useNavigate();
  let message = "";

  const [perfil, setPerfil] = useState({});
  const [montado, setMontado] = useState(false);

  Auth();

  const getPerfil = async () => {
    await axios
      .get(`/auth/profile`)
      .then((response) => {
        if (montado) {
          setPerfil(response.data);
        }
      })
      .catch((error) => {
        message = "Você não está logado ou o seu login expirou.";
        console.log(`Perfil: ${message}`);
        alert(message);
      });
  };

  useEffect(() => {
    setMontado(true);
    getPerfil();
  }, [montado]);

  function handleEditar() {
    navigate("/usuario/editar");
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  }

  return (
    <div className="perfil">
      <div className="perfil__card">
        <p className="perfil__card__nome">{perfil.name}</p>
        <div className="perfil__card__item">
          <div className="perfil__card__item__descricao">E-mail:</div>
          <span className="perfil__card__item__email">{perfil.email}</span>
        </div>
        <div className="perfil__card__item">
          <div className="perfil__card__item__descricao">
            Data de Nascimento:
          </div>
          <span className="perfil__card__item__nascimento">
            {perfil.birthdate}
          </span>
        </div>
        <div className="perfil__card__item">
          <div className="perfil__card__item__descricao">Foto:</div>
          <img
            className="perfil__card__item__foto"
            src={perfil.imageUrl}
            alt={perfil.name}
          />
        </div>

        <div className="perfil__card__btn">
          <button
            className="usuarioEditar"
            type="submit"
            onClick={handleEditar}
          >
            Editar
          </button>
          <button
            className="usuarioLogout"
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
