import { useState } from "react";
import "./Login.scss";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const login = {
      email: email,
      senha: senha,
    };

    axios.post("/auth/login", login).then((response) => {
      const token = response.data.token;      
      localStorage.setItem("token", token);
    });
  };

  return (
    <div className="login">
      <h2 className="login__title">Login</h2>
      <form className="login__formn" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          required
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          required
          onChange={(event) => setSenha(event.target.value)}
        />
        <input type="submit" placeholder="Login" />
      </form>
    </div>
  );
}

export default Login;
