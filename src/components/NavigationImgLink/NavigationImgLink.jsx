import './NavigationImgLink.css';

const NavigationImgLink = ({ imgSrc, linkSrc, imgAlt }) => {
  return (
    <li className="footer__links-item">
      <a href={linkSrc} className="footer__img-link">
        <img src={imgSrc} alt={imgAlt} />
      </a>
    </li>
  );
};

export default NavigationImgLink;
