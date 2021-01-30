import './NewsCard.css';

const NewsCard = ({ image, data, title, description, source, link }) => {
  return (
    <li className="card">
      <span className="card__login-message">
        Войдите, чтобы сохранять статьи
      </span>
      <button className="card__favorites-btn" type="button" />
      <figure className="card__figure-card">
        <img src={image} alt="" className="card__image" />
        <figcaption className="card__content-box">
          <a href={link} className="card__link">
            <span className="card__date">{data}</span>
            <div className="card__text-box">
              <h3 className="card__title">{title}</h3>
              <p className="card__description">{description}</p>
            </div>
          </a>
          <span className="card__source">{source}</span>
        </figcaption>
      </figure>
    </li>
  );
};

export default NewsCard;
