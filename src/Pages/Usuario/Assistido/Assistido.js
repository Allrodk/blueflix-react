import "./Assistido.scss";
import Card from "../../../Components/Card/Card";
import { useEffect, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

function FilmeAssistido() {
  const [filmes, setFilmes] = useState([]);
  const [montado, setMontado] = useState(false);

  const navigate = useNavigate();

  const getFilmes = async () => {
    await axios
      .get("/user/seeList")
      .then((response) => {
        if (montado) {
          setFilmes(response.data);
        }
      })
      .catch(() => {
        navigate("/");
      });
  };

  useEffect(() => {
    setMontado(true);
    getFilmes();
  }, [montado]);

  return (
    <div className="assistido">
      {filmes.map((item) => {
        return (
          <Card
            id={item.id}
            titulo={item.title}
            ano={item.year}
            imagem={item.cover}
            key={item.id}
            visivel={true}
          />
        );
      })}
    </div>
  );
}

export default FilmeAssistido;
