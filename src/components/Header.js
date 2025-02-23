import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <div className="logo-with-images">
      <Link to="/">
        <img src="/assets/logo.jpg" alt="Logo HobbySpot" />
      </Link>
    </div>
    <nav className="menu">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><a href="#about">Quem somos</a></li>
        <li><a href="#contact">Contato</a></li>
      </ul>
    </nav>
  </header>
);

export default Header;
