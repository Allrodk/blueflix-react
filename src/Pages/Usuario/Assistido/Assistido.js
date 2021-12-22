import "./Assistido.scss";
import Card from "../../../Components/Card/Card";
import { useEffect, useState } from "react";

import axios from "axios";

function FilmeAssistido() {
  const [filmes, setFilmes] = useState([]);
  const [montado, setMontado] = useState(false);

  const getFilmes = async () => {
    await axios.get("/user/seeList").then((response) => {
      if (montado) {
        setFilmes(response.data);
      }
    });
  };

  useEffect(() => {
    setMontado(true);
    getFilmes();
  }, [montado]);

  return (
    <div className="assistido">
      {filmes.map((item) => (
        <Card
          id={item.id}
          titulo={item.title}
          ano={item.year}
          imagem={item.cover}
          key={item.id}
        />
      ))}
    </div>
  );
}

export default FilmeAssistido;
