import React from 'react';

import './Footer.css';
import { linkOptions } from '../../constants/links-options';
import NavigationList from '../NavigationLinks/NavigationList';
import NavigationImgLink from '../NavigationImgLink/NavigationImgLink';
import NavigationLinksGroup from '../NavigationLinksGroup/NavigationLinksGroup';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <span className="footer__copyright">&copy;2020 Solnyshkin Ivan</span>
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
          </NavigationList>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
