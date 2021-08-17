import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import "./Navbar.css";

export default function Navbar() {
    const [openMenu, setOpenMenu] = useState(false);

    return (
        <div className={`navbar${openMenu ? " navbar-open" : ""}`}> {/* Sayfa linklerinin verildiği kısım. */}
            <div className="navbar__main container">                
                <div 
                    className={`hamburger${openMenu ? " hamburger-open" : ""}`}
                    onClick={() => setOpenMenu(!openMenu)}
                 >{/* Navbar içerisinde kullanılan hamburger kısmı */}
                    <span></span>
                </div>
                <nav className={`menu${openMenu ? " menu-open" : ""}`}>
                    <ul className="links" onClick={() => setOpenMenu(false)}>
                        <li className="link">
                            <Link to="/">Anasayfa</Link>
                        </li>
                        <li className="link">
                            <Link to="/products">Kahveler</Link>
                        </li>
                        <li className="link logoLink">
                            <Link to="/">
                                <p>Öz Kahvem</p>
                            </Link>
                        </li>
                        <li className="link">
                            <NavHashLink to="/#colorSection" smooth>
                                Hakkımızda
                            </NavHashLink>
                        </li>
                        {/* <li className="link">
                            <Link to="/orders">Siparişler</Link>
                        </li> */}
                        <li className="link">
                            <NavHashLink to="/#rightCard" smooth>
                                İletişim
                            </NavHashLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

// Menu(Navbar)
// Anasayfa - Kahveler - Hakkımızda - İletişim
