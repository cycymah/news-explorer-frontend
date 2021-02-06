import './Footer.css';
import React from 'react';
import NavigationList from '../NavigationLinks/NavigationList';
import NavigationLinksGroup from '../NavigationLinksGroup/NavigationLinksGroup';
import { linkOptions } from '../../constants/links-options';
import NavigationImgLink from '../NavigationImgLink/NavigationImgLink';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <span className="footer__copyright">&copy; 2020 Solnyshkin Ivan</span>
        <nav className="footer__nav-container">
          <ul className="footer__text-links">
            <NavigationLinksGroup />
          </ul>
          <NavigationList>
            {linkOptions.map(({ imgAlt, imgSrc, linkSrc }, i) => (
              <NavigationImgLink
                imgAlt={imgAlt}
                imgSrc={imgSrc}
                linkSrc={linkSrc}
                key={i}
              />
            ))}
            <NavigationList />
          </NavigationList>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
