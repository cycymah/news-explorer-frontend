import './Footer.css';
import React from 'react';
import imgGit from '../../images/git.svg';
import imgFace from '../../images/face.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <span className="footer__copyright">
          &copy; 2020 Solnyshkin Ivan, Powered by News API
        </span>
        <nav className="footer__nav-container">
          <ul className="footer__links-list">
            <li>
              <a href="#" className="footer__text-link">
                Главная
              </a>
            </li>
            <li>
              <a
                href="https://praktikum.yandex.ru/"
                className="footer__text-link"
              >
                Яндекс Практикум
              </a>
            </li>
          </ul>
          <ul className="footer__links-list">
            <li className="footer__links-item">
              <a
                href="https://github.com/cycymah/"
                className="footer__img-link"
              >
                <img src={imgGit} alt="Иконка гитхаба" />
              </a>
            </li>
            <li className="footer__links-item">
              <a
                href="https://www.facebook.com/ivan.solnysh"
                className="footer__img-link"
              >
                <img src={imgFace} alt="Иконка фейсбука" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
