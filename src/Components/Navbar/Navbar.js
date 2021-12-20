import "./Navbar.scss";
import { useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);

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
    console.log("Fechou!!!");
  };
  const handleMouseOut = () => {
    setOpen(false);
  };

  return (
    <div className="navbar">
      <h1 className="navbar__title">
        <a href="/">BlueFlix</a>
      </h1>
      <ul
        className={open ? "navbar__links active" : "navbar__links"}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <li className="navbar__links__items" onClick={handleClick}>
          <a href="/">Home</a>
        </li>
        <li className="navbar__links__items" onClick={handleClick}>
          <a href="/login">Login</a>
        </li>
        <li className="navbar__links__items" onClick={handleClick}>
          <a href="/cadastro">Cadastro</a>
        </li>
        {/* <li className="navbar__links__items" onClick={handleClick}>
          <a href="/filme">Filme</a>
        </li> */}
      </ul>
      <div className="navbar__hamburger" onClick={handleAbreMenu}>
        <span className="navbar__hamburger__items"></span>
        <span className="navbar__hamburger__items"></span>
        <span className="navbar__hamburger__items"></span>
      </div>
    </div>
  );
}

export default Navbar;
