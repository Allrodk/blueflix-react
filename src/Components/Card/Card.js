import "./Card.scss";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Card(props) {
  const navigate = useNavigate();

  const gotoFilme = () => {
    navigate("/filme/detalhes", { state: props.id });
  };  
  return (
    <div className="card" onClick={gotoFilme}>
      <div className="card__topo">
        <div></div>
        <img
          className={
            props.visivel
              ? "card__topo__assistido active"
              : "card__topo__assistido"
          }
          src={require("../../image/estrela1.png")}
          alt="Assistido"
        />
      </div>
      <h5>{props.titulo}</h5>
      <img src={props.imagem} alt={props.titulo} />
      <h5>{props.ano}</h5>
    </div>
  );
}

export default Card;
