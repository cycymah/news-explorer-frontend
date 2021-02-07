import React from 'react';
import classNames from 'classnames';

import './NewsCard.css';

const NewsCard = ({
  image,
  date,
  title,
  description,
  source,
  link,
  saved,
  keyword,
}) => {
  const tooltipText = saved
    ? 'Убрать из сохранённых'
    : 'Войдите, чтобы сохранять статьи';

  const favoritesBtn = classNames('card__favorites-btn', {
    'card__favorites-btn_trash': saved,
    'card__favorites-btn_not-trash': !saved,
  });

  return (
    <li className="card">
      {!saved || <span className="card__keyword">{keyword}</span>}
      <button className={favoritesBtn} type="button" />
      <span className="card__login-message">{tooltipText}</span>
      <figure className="card__figure-card">
        <img src={image} alt="" className="card__image" />
        <figcaption className="card__content-box">
          <a href={link} className="card__link">
            <span className="card__date">{date}</span>
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
