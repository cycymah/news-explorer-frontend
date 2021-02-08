import { Link } from 'react-router-dom';

import './NavigationLinksGroup.css';

const NavigationLinksGroup = () => {
  return (
    <>
      <li>
        <Link to="/" className="footer__text-link">
          Главная
        </Link>
      </li>
      <li>
        <a href="https://praktikum.yandex.ru/" className="footer__text-link">
          Яндекс Практикум
        </a>
      </li>
    </>
  );
};

export default NavigationLinksGroup;
