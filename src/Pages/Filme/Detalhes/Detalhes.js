import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Detalhes.scss";
import axios from "axios";


function Filme() {
  const location = useLocation();
  const navigate = useNavigate();

  const [filme, setFilme] = useState({});
  const [filmeLoad, setFilmeLoad] = useState([]);
  const [atores, setAtores] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [montado, setMontado] = useState(false);
  const [assistido, setAssistido] = useState([]);

  const getFilme = useCallback(async () => {
    try {
      let response = await axios.get(`/movie/findUnique/${location.state}`);
      setFilme(response.data);
      setFilmeLoad((prev) => [(prev = response.data)]);
      setAtores(response.data.cast);
      setGeneros(response.data.genres);
    } catch (e) {}
  }, []);

  const getAssistido = useCallback(async () => {
    getFilme();
    await axios.get(`/user/seeList`).then((response) => {
      setAssistido(response.data);
    });
  }, []);

  const handleAssistido = async () => {
    if (montado) {
      if (assistido === filme.id) {
        await axios.patch(`/user/addList/${assistido}`).then((response) => {});
      } else {
        await axios.patch(`/user/addList/${filme.id}`).then((response) => {});
      }
      getAssistido();
    }
  };

  useEffect(() => {
    setMontado(true);
    getFilme();
    getAssistido();
  }, [montado, getFilme, getAssistido]);

  function handleEditar() {
    navigate("/filme/editar");
  }

  return (
    <div className="filme">
      <div className="filme__imagemBg">
        <div
          className="filme__imagemBg__img"
          style={{
            backgroundImage: `url(${filme.cover})`,
          }}
        ></div>
      </div>
      <div className="filme__subcard">
        <div className="filme__card">
          <div className="filme__card__topo">
            <p className="filme__card__titulo">{filme.title}</p>
            <div className="filme__card__assistido">
              <img
                className="imgAssistido"
                src={filmeLoad.map((item) => {                 
                  let chave = false;
                  assistido.map((checar) => {
                    if (item.id === checar.id) {
                      chave = true;
                    }
                    return chave;
                  });
                  if (chave) {
                    return require("../../../image/estrela1.png");
                  } else {
                    return require("../../../image/estrela0.png");
                  }
                })}
                alt="Assistido"
                onClick={handleAssistido}               
              ></img>
            </div>
          </div>
          <div className="filme__card__item">
            <div className="filme__card__item__descricao">Genero</div>
            {generos.map((item) => (
              <span className="filme__card__item__valor" key={item.toString()}>
                {item}
              </span>
            ))}
          </div>
          <div className="filme__card__item">
            <div className="filme__card__item__descricao">
              Ano de Lançamento
            </div>
            <span className="filme__card__item__valor">{filme.year}</span>
          </div>
          <div className="filme__card__item">
            <div className="filme__card__item__descricao">Atores</div>
            {atores.map((item, indice) => {
              let ator = item;
              if (atores.length > indice + 2) {
                ator = item + ", ";
              } else if (atores.length > indice + 1) {
                ator = item + " e ";
              }
              return (
                <span
                  className="filme__card__item__valor"
                  key={item.toString()}
                >
                  {ator}
                </span>
              );
            })}
          </div>
          <div className="filme__card__item">
            <div className="filme__card__item__descricao">Sinopse</div>
            <p className="filme__card__item__valor">{filme.resume}</p>
          </div>
          <div className="filme__card__item">
            <div className="filme__card__item__btn">
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
    </div>
  );
}

export default Filme;
