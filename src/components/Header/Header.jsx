import './Header.css';
import imageBtn from '../../images/Union.png';
import { Link } from 'react-router-dom';

function Header({ handlePopupOpen }) {
  const isAutoriz = false;
  const buttonText = isAutoriz ? 'Грета' : 'Авторизация';

  return (
    <header className="header">
      <div className="header_container">
        <Link to="/" className="header__title-link">
          <h2 className="header__title">NewsExplorer</h2>
        </Link>
        <div className="header__functional-box">
          <Link to="/" className="header__link">
            Главная
          </Link>
          {isAutoriz ? (
            <Link to="/saved-news" className="header__link">
              Сохраненные статьи
            </Link>
          ) : (
            ''
          )}
          <button
            className="header__authorization-btn"
            onClick={handlePopupOpen}
          >
            {buttonText}
            <img src={imageBtn} className="header__img-btn" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
