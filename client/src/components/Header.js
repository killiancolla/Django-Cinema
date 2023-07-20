import '../style/header.css';
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
          <Link to="/Accueil">Animal List</Link>
        </div>
      </div>
    </header>
  );
}
