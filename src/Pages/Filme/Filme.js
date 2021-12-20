import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Filme.scss";
import axios from "axios";

function Filme() {
  const location = useLocation();
  const [filme, setFilme] = useState({});
  const [atores, setAtores] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [montado, setMontado] = useState(false);

  const getFilme = async () => {
    await axios.get(`/movie/findUnique/${location.state}`).then((response) => {
      if (montado) {
        setFilme(response.data);
        setAtores(response.data.cast);
        setGeneros(response.data.genres);
      }
    });
  };

  console.log(filme);

  useEffect(() => {
    setMontado(true);
    getFilme();
  }, [montado]);

  return (
    <div className="filme">
      <div
        class="imagemBg"
        style={{
          backgroundImage: `url(${filme.cover})`,
        }}
      >
        <div className="filme__card">
          <p className="filme__card__titulo">{filme.title}</p>
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
            <button id="cadastrar" type="submit">
              Editar
            </button>
            <button id="cancelar" type="button">
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filme;
