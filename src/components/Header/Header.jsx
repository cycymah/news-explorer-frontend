import classNames from 'classnames';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

import './Header.css';
import NavigationMenu from '../NavigationMenu/NavigationMenu';

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

  const overlayClasses = classNames('header__overlay', {
    header__overlay_active: isMenuOpen,
  });

  const handleToggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <header className={headerClasses}>
      <div className={overlayClasses} />
      <div className="header__container">
        <Link to="/" className="header__title-link">
          <h2 className="header__title">NewsExplorer</h2>
        </Link>
        <NavigationMenu
          isAutoriz={isAutoriz}
          isRootPath={isRootPath}
          handlePopupOpen={handlePopupOpen}
          isMenuOpen={isMenuOpen}
          handleMenuOpen={setMenuOpen}
        />
        <button
          className={burgerClasses}
          name="menu"
          onClick={handleToggleMenu}
        />
      </div>
    </header>
  );
}

export default Header;
