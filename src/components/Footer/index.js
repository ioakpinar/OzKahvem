import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";

export default function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer__navbar">
          <nav className="footer__menu">
            <ul className="footer__links"> {/* Navbar içerisinde kullanılan sayfa linkleri bu bölümde de kullanıldı.*/}
              <li className="footer__link">
                <Link to="/">Anasayfa</Link> 
              </li>
              <li className="footer__link">
                <Link to="/products">Kahveler</Link>
              </li>
              <li className="footer__link footer__logoLink">
                <Link to="/">
                  <p>Öz Kahvem</p>
                </Link>
              </li>
              <li className="footer__link">
                <NavHashLink to="/#colorSection" smooth>
                  Hakkımızda
                </NavHashLink>
              </li>

              <li className="footer__link">
                <NavHashLink to="/#rightCard" smooth>
                  İletişim
                </NavHashLink>
              </li>
            </ul>
          </nav>
        </div>

        <div className="footer__body">
          <p>
            Öz Kahvem BLM0499 StajII dersi kapsamında CITS bünyesinde
            geliştirilen bir web uygulamasıdır.
          </p>

          <small>Copyright 2021. Tüm Hakları Saklıdır.</small>
        </div>
      </div>
    </div>
  );
}
