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
              <a href="#" className="footer__text-link">
                Яндекс Практикум
              </a>
            </li>
          </ul>
          <ul className="footer__links-list">
            <li>
              <a href="#" className="footer__img-link footer__img-link_git">
                <img src={imgGit} />
              </a>
            </li>
            <li>
              <a href="#" className="footer__img-link footer__img-link_face">
                <img src={imgFace} />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
