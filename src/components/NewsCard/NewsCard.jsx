import classNames from 'classnames';
import React, { useState, useEffect } from 'react';

import './NewsCard.css';
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
  handleFavorites,
  handleOpenRegModal,
}) => {
  const [isFavorite, setIsFavorite] = useState(!!id);
  const [textTooltip, setTooltipText] = useState('');
  const [currentCardId, setCurrentCardId] = useState('');

  const favoritesBtn = classNames('card__favorites-btn', {
    'card__favorites-btn_trash': saved,
    'card__favorites-btn_active': isFavorite && !saved,
    'card__favorites-btn_not-trash': !isFavorite,
  });

  useEffect(() => {
    setInitialTooltips();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);
  // Меняем формат даты
  const dateReformat = () => {
    const initialDate = new Date(date);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return initialDate.toLocaleDateString('ru-RU', options);
  };

  // Устанавливаем тултипы при инициализации
  const setInitialTooltips = () => {
    if (id) {
      return setTooltipText(TOOLTIP_TEXT.deleteFromFavorites);
    } else if (loggedIn) {
      return setTooltipText(TOOLTIP_TEXT.addToFavorites);
    }
    setTooltipText(TOOLTIP_TEXT.notLogin);
  };

  const onFavoritesClick = () => {
    if (isFavorite) {
      handleFavoriteDelete(id || currentCardId);
      setTooltipText(TOOLTIP_TEXT.addToFavorites);
      setIsFavorite(false);
    } else if (!isFavorite && loggedIn) {
      handleFavorites({
        title: title,
        text: description,
        date: date,
        source: source,
        image: image,
        link: link,
      }).then(({ _id }) => {
        setIsFavorite(true);
        setCurrentCardId(_id);
        setTooltipText(TOOLTIP_TEXT.deleteFromFavorites);
      });
    } else {
      handleOpenRegModal();
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
            <span className="card__date">{dateReformat()}</span>
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
