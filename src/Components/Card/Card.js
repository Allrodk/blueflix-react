import "./Card.scss";

import { useNavigate } from "react-router-dom";

function Card(props) {
  const navigate = useNavigate();

  const gotoFilme = () => {
    navigate("/filme/detalhes", { state: props.id });
  };

  return (
    <div className="card" onClick={gotoFilme}>
      <h5>{props.titulo}</h5>
      <img src={props.imagem} alt={props.titulo} />
      <h5>{props.ano}</h5>
    </div>
  );
}

export default Card;
