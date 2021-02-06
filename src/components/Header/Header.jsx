import './Header.css';
import imageBtn from '../../images/Union.png';
import imageBtnLight from '../../images/logout.png';

import { Link } from 'react-router-dom';
import classNames from 'classnames';

function Header({ handlePopupOpen, isAutoriz, currentRoute }) {
  const buttonText = isAutoriz ? 'Грета' : 'Авторизация';

  const imageBtnSwitch =
    currentRoute === '/saved-news' ? imageBtn : imageBtnLight;
  const activeRootRoute = classNames('header__link', {
    header__link_active: currentRoute === '/',
  });

  const activeSavedNewsRoute = classNames('header__link', {
    'header__link_active-dark': currentRoute === '/saved-news',
  });

  const btnClasses = classNames('header__authorization-btn', {
    'header__authorization-btn_dark': currentRoute === '/saved-news',
  });

  const headerText = classNames('header', {
    header_dark: currentRoute === '/saved-news',
  });

  return (
    <header className={headerText}>
      <div className="header__container">
        <Link to="/" className="header__title-link">
          <h2 className="header__title">NewsExplorer</h2>
        </Link>
        <div className="header__functional-box">
          <Link to="/" className={activeRootRoute}>
            Главная
          </Link>
          {!isAutoriz || (
            <Link to="/saved-news" className={activeSavedNewsRoute}>
              Сохраненные статьи
            </Link>
          )}
          <button className={btnClasses} onClick={handlePopupOpen}>
            {buttonText}

            {!isAutoriz || (
              <img src={imageBtnSwitch} className="header__img-btn" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
