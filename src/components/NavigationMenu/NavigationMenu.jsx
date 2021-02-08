import classNames from 'classnames';
import { Link } from 'react-router-dom';

import './NavigationMenu.css';
import imageBtn from '../../images/Union.png';
import imageBtnLight from '../../images/logout.png';

const NavigationMenu = ({
  isAutoriz,
  isRootPath,
  handlePopupOpen,
  isMenuOpen,
  closeMenu,
  handleMenuOpen,
}) => {
  const buttonText = isAutoriz ? 'Грета' : 'Авторизация';
  const imageBtnSwitch = !isRootPath && !isMenuOpen ? imageBtn : imageBtnLight;
  const activeRootRoute = classNames('navigation__link-item', {
    'navigation__link-item_active': isRootPath,
  });

  const activeSavedNewsRoute = classNames('navigation__link-item', {
    'navigation__link-item_active-dark': !isRootPath,
  });

  const btnClasses = classNames('navigation__authorization-btn', {
    'navigation__authorization-btn_dark': !isRootPath && !isMenuOpen,
  });

  const navigationClasses = classNames('navigation', {
    navigation_active: isMenuOpen,
  });

  const handleOpenAuthPopup = () => {
    handleMenuOpen(false);
    handlePopupOpen();
  };

  const handleCloseMenu = evt => {
    evt.stopPropagation();
    handleMenuOpen(false);
  };

  return (
    <nav className={navigationClasses}>
      <ul className="navigation__links">
        <li className={activeRootRoute} onClick={handleCloseMenu}>
          <Link to="/" className="navigation__link">
            Главная
          </Link>
        </li>
        {!isAutoriz || (
          <li className={activeSavedNewsRoute} onClick={handleCloseMenu}>
            <Link to="/saved-news" className="navigation__link">
              Сохраненные статьи
            </Link>
          </li>
        )}
      </ul>
      <button className={btnClasses} onClick={handleOpenAuthPopup}>
        {buttonText}
        {!isAutoriz || (
          <img
            src={imageBtnSwitch}
            className="navigation__img-btn"
            alt="exit"
          />
        )}
      </button>
    </nav>
  );
};

export default NavigationMenu;
