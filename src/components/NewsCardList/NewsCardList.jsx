import React, { useState } from 'react';
import classNames from 'classnames';

import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';

const NewsCardList = ({
  loggedIn,
  newsData,
  handleMoreNews,
  handleFavorites,
  handleOpenRegModal,
  handleDeleteCard,
  searchNews,
}) => {
  const hideTitle = classNames('news__title', {
    'news_show-saved-news': loggedIn,
  });

  // Отрисовка кнопки для рендера новостей
  const buttonRender = () =>
    searchNews.length === newsData.length ? (
      ''
    ) : (
      <button
        className="news__more-news-btn"
        type="button"
        onClick={handleMoreNews}
      >
        Показать еще
      </button>
    );

  return (
    <section className="news">
      <div className="news__container">
        <h2 className={hideTitle}>Результаты поиска</h2>
        <ul className="news__list">
          {newsData.map((oneNews, i) => (
            <NewsCard
              saved={false}
              key={i}
              loggedIn={loggedIn}
              title={oneNews.title}
              image={oneNews.urlToImage}
              date={oneNews.publishedAt}
              source={oneNews.source.name}
              description={oneNews.description}
              link={oneNews.url}
              handleFavoriteDelete={handleDeleteCard}
              handleFavorites={handleFavorites}
              handleOpenRegModal={handleOpenRegModal}
              keyword={oneNews.keyword}
            />
          ))}
        </ul>
        {buttonRender()}
      </div>
    </section>
  );
};

export default NewsCardList;
