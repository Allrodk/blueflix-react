import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Editar.scss";

export default function EditarFilme() {
  const navigate = useNavigate();
  let message = "";

  const handleSubmit = (event) => {
    event.preventDefault();

    const titulo = event.target.titulo.value;
    const ano = event.target.ano.value;
    const imagem = event.target.imagem.value;
    const sinopse = event.target.sinopse.value;
    const atores = event.target.atores.value;
    const genero = event.target.genero.value;

    const editFilme = {
      title: titulo,
      year: ano,
      cover: imagem,
      resume: sinopse,
      cast: atores,
      genres: genero,
    };

    axios.patch("/movie/update", editFilme).then((response) => {
      console.log(response);
      console.log(response.data);
      if (response.statusText === "Created") {
        message = "Filme alterado com sucesso";
        Voltar();
      }
    });
  };

  function Voltar() {
    navigate("/");
  }

  return (
    <div className="editFilme">
      <h2 className="editFilme__titulo">Editar Filme</h2>
      <form className="editFilme__form" onSubmit={handleSubmit}>
        <div className="editFilme__form__item">
          <label htmlFor="titulo">Título:</label>
          <input id="titulo" type="text" placeholder="Título" name="titulo" />
        </div>
        <div className="editFilme__form__item">
          <label htmlFor="ano">Ano:</label>
          <input id="ano" type="number" step="1" placeholder="Ano" name="ano" />
        </div>
        <div className="editFilme__form__item">
          <label htmlFor="imagem">Imagem:</label>
          <input
            id="imagem"
            type="text"
            placeholder="Url da imagem"
            name="imagem"
          />
        </div>
        <div className="editFilme__form__item">
          <label htmlFor="sinopse">Sinopse:</label>
          <input
            id="sinopse"
            type="text"
            placeholder="sinopse"
            name="sinopse"
          />
        </div>
        <div className="editFilme__form__item">
          <label htmlFor="atores">Atores: </label>
          <input id="atores" type="text" placeholder="Atores" name="atores" />
        </div>
        <div className="editFilme__form__item">
          <label htmlFor="genero">Gênero: </label>
          <input id="genero" type="text" placeholder="Gênero" name="genero" />
        </div>
        <div className="editFilme__form__item">
          <div className="editFilme__form__item__btn">
            <button className="editar" type="submit">
              Editar
            </button>
            <button className="voltar" type="button" onClick={Voltar}>
              Voltar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
