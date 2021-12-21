import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Cadastro.scss";

export default function Cadastro() {
  const navigate = useNavigate();
  let message = "";

  const handleSubmit = (event) => {
    event.preventDefault();

    const nome = event.target.nome.value;
    const email = event.target.email.value;
    const nascimento = event.target.nascimento.value;
    const senha = event.target.senha.value;
    const confirmaSenha = event.target.confirmaSenha.value;
    const imagem = event.target.imagem.value;

    const cadastro = {
      name: nome,
      email: email,
      birthdate: nascimento,
      password: senha,
      passwordConfirmation: confirmaSenha,
      imageUrl: imagem,
    };

    axios.post("/user/create", cadastro).then((response) => {
      console.log(response);
      console.log(response.data);
      if (response.statusText === "Created") {
        message = "Cadastro efetuado com sucesso";
        console.log(message);
        Cancelar();
      }
    });
  };

  function Cancelar() {
    navigate("/");
  }

  return (
    <div className="cadastro">
      <h2 className="cadastro__titulo">Cadastro de Usuário</h2>
      <form className="cadastro__form" onSubmit={handleSubmit}>
        <div className="cadastro__form__item">
          <label htmlFor="nome">Nome:</label>
          <input id="nome" type="text" placeholder="Nome" name="nome" />
        </div>
        <div className="cadastro__form__item">
          <label htmlFor="email">E-mail:</label>
          <input id="email" type="text" placeholder="E-mail" name="email" />
        </div>
        <div className="cadastro__form__item">
          <label htmlFor="nascimento">Data de Nascimento:</label>
          <input
            id="nascimento"
            type="Date"
            step="1"
            placeholder="Data de Nascimento"
            name="nascimento"
          />
        </div>
        <div className="cadastro__form__item">
          <label htmlFor="senha">Senha:</label>
          <input
            id="senha"
            type="password"
            step="1"
            placeholder="Senha"
            name="senha"
          />
        </div>
        <div className="cadastro__form__item">
          <label htmlFor="confirmaSenha">Confirmação da Senha: </label>
          <input
            id="confirmaSenha"
            type="password"
            placeholder="Confirmação da Senha:"
            name="confirmaSenha"
          />
        </div>
        <div className="cadastro__form__item">
          <label htmlFor="imagem">URL da Imagem: </label>
          <input
            id="imagem"
            type="text"
            placeholder="URL da Imagem:"
            name="imagem"
          />
        </div>
        <div className="cadastro__form__item">
          <div className="cadastro__form__item__btn">
            <button className="cadastrar" type="submit">
              Cadastrar
            </button>
            <button className="cancelar" type="button" onClick={Cancelar}>
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
