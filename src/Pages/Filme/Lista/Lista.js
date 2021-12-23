import "./Lista.scss";
import Card from "../../../Components/Card/Card";
import { useEffect, useState } from "react";

import axios from "axios";

function ListaFilme() {
  const [filmes, setFilmes] = useState([]);
  const [assistido, setAssistido] = useState([]);
  const [montado, setMontado] = useState(false);

  const getFilmes = async () => {
    try {
      const response = await axios.get("/movie/findMany");
      if (montado) {
        setFilmes(response.data);
      }
    } catch (e) {}
  };

  const getAssistido = async () => {
    try {
      const response = await axios.get("/user/seeList");
      if (montado) {
        setAssistido(response.data);
      }
    } catch (e) {}
  };

  useEffect(() => {
    setMontado(true);
    getAssistido();
    getFilmes();
  }, [montado]);

  return (
    <div className="lista">
      {filmes.map((itemF, indice) => {
        let chave = false;
        assistido.map((itemA) => {
          if (itemA.id === itemF.id) {
            chave = true;
          }
        });
        return (
          <Card
            id={itemF.id}
            titulo={itemF.title}
            ano={itemF.year}
            imagem={itemF.cover}
            key={itemF.id}
            visivel={chave}
          />
        );
      })}
    </div>
  );
}

export default ListaFilme;
