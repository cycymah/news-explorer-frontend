import './Header.css';
import imageBtn from '../../images/Union.png';

function Header() {
  const isAutoriz = false;
  const buttonText = 'Авторизация' || 'Грета';
  return (
    <header className="header">
      <div className="header_container">
        <h2 className="header__title">NewsExplorer</h2>
        <div className="header__functional-box">
          <a href="#" className="header__link">
            Главная
          </a>
          {isAutoriz ? (
            <a href="#" className="header__link">
              Сохраненные статьи
            </a>
          ) : (
            ''
          )}
          <button className="header__authorization-btn">
            {buttonText}
            {/*<img src={imageBtn} className="header__img-btn" />*/}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
