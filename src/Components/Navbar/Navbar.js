import "./Navbar.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Auth from "../../Auth/Auth";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [montado, setMontado] = useState(false);
  const [menu, setMenu] = useState([]);

  const navigate = useNavigate();
  const deslogado = [
    {
      href: "/",
      link: "Home",
    },
    {
      href: "/usuario/login",
      link: "Login",
    },
    {
      href: "/usuario/cadastro",
      link: "Cadastro",
    },
  ];
  const logado = [
    {
      href: "/filme/lista",
      link: "Filmes",
    },
    {
      href: "/usuario/perfil",
      link: "Perfil",
    },
    {
      href: "/",
      link: "Logout",
    },
  ];

  Auth();
  const getPerfil = async () => {
    await axios
      .get(`/auth/profile`)
      .then((response) => {       
        setMenu(logado);
      })
      .catch((error) => {       
        setMenu(deslogado);
      });
  };

  useEffect(() => {
    setMontado(true);
    getPerfil();
  }, [montado]);

  const handleAbreMenu = () => {
    if (!open) {
      setOpen(true);
      setTimeout(handleClick, 5000);
    } else {
      setOpen(false);
    }
  };
  const handleMouseOver = () => {
    setOpen(true);
  };

  const handleClick = () => {
    setOpen(false);
  };
  const handleMouseOut = () => {
    setOpen(false);
  };

  function handleHome() {
    navigate(menu[0].href);
  }

  function handleLogout() {
    localStorage.removeItem("token");
  }

  return (
    <div className="navbar">
      <h1 className="navbar__title">
        <a href="#foo" onClick={handleHome}>
          Blueflix
        </a>
      </h1>
      <ul
        className={open ? "navbar__links active" : "navbar__links"}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {/* Cria lista de menu  */}
        {menu.map((item, indice) => {
          if (item.link === "Logout")
            return (
              <li className="navbar__links__items" onClick={handleLogout}>
                <a href={item.href}>{item.link}</a>
              </li>
            );
          else
            return (
              <li className="navbar__links__items" onClick={handleClick}>
                <a href={item.href}>{item.link}</a>
              </li>
            );
        })}
      </ul>
      <div className="navbar__hamburger" onClick={handleAbreMenu}>
        <a href="#foo">
          <span className="navbar__hamburger__items"></span>
          <span className="navbar__hamburger__items"></span>
          <span className="navbar__hamburger__items"></span>
        </a>
      </div>
    </div>
  );
}

export default Navbar;
