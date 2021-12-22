import "./Home.scss";

function Home() {
  return (
    <div className="home">
      <h2 className="home__item">
        Bem vindos ao BlueFlix, o melhor catálogo de filmes da Galáxia!
      </h2>
      <h2 className="home__item">
        Faça já o seu
        <a className="home__item__link" href="/usuario/cadastro">
          &nbsp; cadastro &nbsp;
        </a>
        ou
        <a className="home__item__link" href="/usuario/login">
          &nbsp; login &nbsp;
        </a>
        e desfrute do melhor!
      </h2>
    </div>
  );
}

export default Home;
