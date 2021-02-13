import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import './NewsCard.css';
import mainApi from '../../utils/MainApi';
import { TOOLTIP_TEXT } from '../../constants/tooltipText';

const NewsCard = ({
  image,
  date,
  title,
  description,
  source,
  link,
  saved,
  keyword,
  loggedIn,
  id,
  handleFavoriteDelete,
}) => {
  const [isFavorite, setIsFavorite] = useState(!!id);
  const [textTooltip, setTooltipText] = useState('');
  useEffect(() => {
    setInitialTooltips();
  }, []);

  const setInitialTooltips = () => {
    if (id) {
      return setTooltipText(TOOLTIP_TEXT.deleteFromFavorites);
    } else if (loggedIn) {
      return setTooltipText(TOOLTIP_TEXT.addToFavorites);
    }
    setTooltipText(TOOLTIP_TEXT.notLogin);
  };

  const favoritesBtn = classNames('card__favorites-btn', {
    'card__favorites-btn_trash': isFavorite,
    'card__favorites-btn_not-trash': !isFavorite,
  });

  // Добавить запись в избранное
  const handleFavorites = async data => {
    try {
      await mainApi.addNewsCard(data);
      setIsFavorite(true);
      setTooltipText(TOOLTIP_TEXT.deleteFromFavorites);
    } catch (err) {
      console.error(err);
    }
  };

  const onFavoritesClick = () => {
    if (isFavorite) {
      handleFavoriteDelete(id);
    } else if (!isFavorite && loggedIn) {
      handleFavorites({
        keyword: title.split(' ')[0],
        title: title,
        text: description,
        date: date,
        source: source,
        image: image,
        link: link,
      });
    }
  };

  return (
    <li className="card">
      {!saved || <span className="card__keyword">{keyword}</span>}
      <button
        className={favoritesBtn}
        type="button"
        onClick={onFavoritesClick}
      />
      <span className="card__login-message">{textTooltip}</span>
      <figure className="card__figure-card">
        <img src={image} alt="" className="card__image" />
        <figcaption className="card__content-box">
          <a
            href={link}
            className="card__link"
            target="_blank"
            rel="noreferrer"
          >
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
