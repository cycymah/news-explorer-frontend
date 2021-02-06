import './Header.css';

import { Link } from 'react-router-dom';
import classNames from 'classnames';
import NavigationMenu from '../NavigationMenu/NavigationMenu';
import React, { useState } from 'react';

function Header({ handlePopupOpen, isAutoriz, isRootPath }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const headerClasses = classNames('header', {
    header_dark: !isRootPath && !isMenuOpen,
    header__background_black: isMenuOpen,
  });

  const burgerClasses = classNames('header__burger', {
    header__burger_dark: !isRootPath,
    header__burger_background_close: isMenuOpen,
  });

  const handleMenuOpen = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <header className={headerClasses}>
      <div className="header__container">
        <Link to="/" className="header__title-link">
          <h2 className="header__title">NewsExplorer</h2>
        </Link>
        <NavigationMenu
          isAutoriz={isAutoriz}
          isRootPath={isRootPath}
          handlePopupOpen={handlePopupOpen}
          isMenuOpen={isMenuOpen}
          closeMenu={handleMenuOpen}
        />
        <button
          className={burgerClasses}
          name="menu"
          onClick={handleMenuOpen}
        />
      </div>
    </header>
  );
}

export default Header;
