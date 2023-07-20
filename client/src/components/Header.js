import "../style/header.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header" id="header">
      <nav className="nav container">
        <Link onClick={closeMenu} to="/" className="nav__logo">
          Mon Siège de Rêve
        </Link>

        <div
          className={`nav__menu active-link${isMenuOpen ? " show-menu" : ""}`}
          id="nav-menu"
        >
          <ul className="nav__list grid">
            <li className="nav__item">
              <Link onClick={closeMenu} to="/" className="nav__link">
                <i class="ri-coupon-2-line"></i> Séances
              </Link>
            </li>

            <li className="nav__item">
              <Link onClick={closeMenu} to="/cart" className="nav__link">
                <i class="ri-shopping-cart-2-line"></i> Panier
              </Link>
            </li>

            <li className="nav__item">
              <Link onClick={closeMenu} to="/inscription" className="nav__link">
                <i class="ri-account-circle-line"></i> Inscription
              </Link>
            </li>

            <li className="nav__item">
              <Link onClick={closeMenu} to="/account" className="nav__link">
                <i class="ri-account-circle-line"></i> Mon compte
              </Link>
            </li>

            <li className="nav__item">
              <Link
                onClick={closeMenu}
                to="http://localhost:8000/admin"
                target="_blank"
                className="nav__link"
              >
                <i class="ri-settings-2-line"></i> Administration
              </Link>
            </li>
          </ul>

          <div className="nav__close" onClick={toggleMenu}>
            <i className="ri-close-line"></i>
          </div>
        </div>

        <div className="nav__buttons">
          <div className="nav__toggle" onClick={toggleMenu}>
            <i className="ri-menu-4-line"></i>
          </div>
        </div>
      </nav>
    </header>
  );
}
