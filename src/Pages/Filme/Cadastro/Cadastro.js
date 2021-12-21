import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Cadastro.scss";

export default function CadastrarFilme() {
  const navigate = useNavigate();
  let message = "";

  const handleSubmit = (event) => {
    event.preventDefault();

    const titulo = event.target.titulo.value;
    const ano = parseInt(event.target.ano.value);
    const imagem = event.target.imagem.value;
    const sinopse = event.target.sinopse.value;
    let atores = [];
    atores.push(event.target.atores.value.replace(/, /g, ",").toString());
    let genero = [];
    genero.push(event.target.genero.value.replace(/, /g, ",").toString());

    console.log(atores);
    const cadFilme = {
      title: titulo,
      year: ano,
      cover: imagem,
      resume: sinopse,
      cast: atores,
      genres: genero,
    };

    console.log(cadFilme);

    axios.post("/movie/create", cadFilme).then((response) => {
      console.log(response);
      console.log(response.data);
      if (response.statusText === "Created") {
        message = "Filme cadastrado com sucesso";
        Voltar();
      }
    });
  };

  function Voltar() {
    navigate("/");
  }

  return (
    <div className="cadFilme">
      <h2 className="cadFilme__titulo">Cadastro de Filme</h2>
      <form className="cadFilme__form" onSubmit={handleSubmit}>
        <div className="cadFilme__form__item">
          <label htmlFor="titulo">Título:</label>
          <input
            id="titulo"
            type="text"
            placeholder="Título"
            name="titulo"
            required
          />
        </div>
        <div className="cadFilme__form__item">
          <label htmlFor="ano">Ano:</label>
          <input
            id="ano"
            type="number"
            step="1"
            placeholder="Ano"
            name="ano"
            required
          />
        </div>
        <div className="cadFilme__form__item">
          <label htmlFor="imagem">Imagem:</label>
          <input
            id="imagem"
            type="text"
            placeholder="Url da imagem"
            name="imagem"
            required
          />
        </div>
        <div className="cadFilme__form__item">
          <label htmlFor="sinopse">Sinopse:</label>
          <input
            id="sinopse"
            type="text"
            placeholder="sinopse"
            name="sinopse"
            required
          />
        </div>
        <div className="cadFilme__form__item">
          <label htmlFor="atores">Atores: </label>
          <input
            id="atores"
            type="text"
            placeholder="Atores"
            name="atores"
            required
          />
        </div>
        <div className="cadFilme__form__item">
          <label htmlFor="genero">Gênero: </label>
          <input
            id="genero"
            type="text"
            placeholder="Gênero"
            name="genero"
            required
          />
        </div>
        <div className="cadFilme__form__item">
          <div className="cadFilme__form__item__btn">
            <button className="cadar" type="submit">
              Cadastrar
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
