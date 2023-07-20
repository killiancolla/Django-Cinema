import "../style/header.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <div className="header">
        <div className="branding">
          <h1 className="site-name">
            <Link to="/">Mon Siège de Rêve</Link>
          </h1>
        </div>

        <div className="page-link">
          <Link to="/">Séances</Link>
          <Link to="/cart">Panier</Link>
          <Link to="/login">Connexion</Link>
          <Link to="/account">Mon compte</Link>
          <Link to="http://localhost:8000/admin" target="_blank">Administration</Link>
        </div>
      </div>
    </header>
  );
}
