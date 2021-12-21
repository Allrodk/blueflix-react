import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Detalhes.scss";
import axios from "axios";

function Filme() {
  const location = useLocation();
  const navigate = useNavigate();

  const [filme, setFilme] = useState({});
  const [atores, setAtores] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [montado, setMontado] = useState(false);
  // const [assistido, setAssistido] = useState("");
  const [urlAss, setUrlAss] = useState("");

  const getFilme = async () => {
    await axios.get(`/movie/findUnique/${location.state}`).then((response) => {
      if (montado) {
        setFilme(response.data);
        setAtores(response.data.cast);
        setGeneros(response.data.genres);
      }
    });
  };

  const getAssistido = async () => {
    await axios.get(`/user/seeList`).then((response) => {
      response.data.map((usufilme) => {
        if (montado) {
          if (usufilme.id === filme.id) {
            setUrlAss(require("../../../image/estrela1.jpg"));
          } else {
            setUrlAss(require("../../../image/estrela0.jpg"));
          }
          // setAssistido(usufilme.id);
        }
      });
    });
  };

  // const handleAssistido = async () => {
  //   if (assistido === filme.id) {
  //     await axios
  //       .patch(`/user/addList/${assistido}`)
  //       .then((response) => {
  //         console.log(response);
  //       })
  //       .catch((error) => {
  //         console.log(`Perfil: ${error}`);
  //       });
  //   }
  // };

  useEffect(() => {
    setMontado(true);
    getFilme();
    getAssistido();
  }, [montado, urlAss, filme]);

  function handleEditar() {
    navigate("/filme/editar");
  }

  return (
    <div className="filme">
      <div
        className="imagemBg"
        style={{
          backgroundImage: `url(${filme.cover})`,
        }}
      >
        <div className="filme__card">
          <div className="filme__card__topo">
            <p className="filme__card__titulo">{filme.title}</p>
            <div className="filme__card__assistido">
              <img
                className="imgAssistido"
                src={urlAss}
                alt="Assistido"
                // onClick={handleAssistido}
              ></img>
            </div>
          </div>
          <div className="filme__card__genero">
            <div className="filme__card__genero__descricao">Genero</div>
            {generos.map((item) => (
              <span className="filme__card__genero__item" key={item.toString()}>
                {item}
              </span>
            ))}
          </div>
          <div className="filme__card__ano">
            <div className="filme__card__ano__descricao">Ano de Lançamento</div>
            <span className="filme__card__ano__item">{filme.year}</span>
          </div>
          <div className="filme__card__atores">
            <div className="filme__card__atores__descricao">Atores</div>
            {atores.map((item, indice) => {
              if (atores.length > indice + 2)
                return (
                  <span
                    className="filme__card__atores__item"
                    key={item.toString()}
                  >
                    {item},&nbsp;
                  </span>
                );
              else if (atores.length > indice + 1)
                return (
                  <span
                    className="filme__card__atores__item"
                    key={item.toString()}
                  >
                    {item}&nbsp;e&nbsp;
                  </span>
                );
              else
                return (
                  <span
                    className="filme__card__atores__item"
                    key={item.toString()}
                  >
                    {item}.
                  </span>
                );
            })}
          </div>
          <div className="filme__card__sinopse">
            <div className="filme__card__sinopse__descricao">Sinopse</div>
            <p className="filme__card__sinopse__texto">{filme.resume}</p>
          </div>
          <div className="filme__card__btn">
            <button className="editar" type="submit" onClick={handleEditar}>
              Editar
            </button>
            <button className="excluir" type="button">
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filme;
