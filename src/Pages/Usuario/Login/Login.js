import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import axios from "axios";

function Login(props) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const login = {
      email: email,
      password: senha,
    };

    axios.post("/auth/login", login).then((response) => {
      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/filme/lista", { state: props.id });
      window.location.reload(); 
    });
    
  };

  return (
    <div className="login">
      <h2 className="login__titulo">Login</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__form__item">
          <span className="login__form__item__descricao">E-mail:</span>
          <input
            className="login__form__item__input"
            type="email"
            placeholder="Email"
            required
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="login__form__item">
          <span className="login__form__item__descricao">Senha:</span>
          <input
            className="login__form__item__input"
            type="password"
            placeholder="Senha"
            required
            onChange={(event) => setSenha(event.target.value)}
          />
        </div>
        <div className="login__form__item2">          
          <button className="login__form__item2__btn" type="button" onClick={handleSubmit}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
