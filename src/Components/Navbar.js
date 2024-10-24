import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faVideo, faShoppingCart, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">

            <FontAwesomeIcon icon={faHome} /> StreamList
          </Link>
        </li>
        <li>
          <Link to="/movies">
            <FontAwesomeIcon icon={faVideo} /> Movies
          </Link>
        </li>
        <li>
          <Link to="/cart">
            <FontAwesomeIcon icon={faShoppingCart} /> Cart
          </Link>
        </li>
        <li>
          <Link to="/about">
            <FontAwesomeIcon icon={faQuestionCircle} /> About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;