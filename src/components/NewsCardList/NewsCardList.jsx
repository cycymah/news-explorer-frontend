import classNames from 'classnames';
import React from 'react';

import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';
import mainApi from '../../utils/MainApi';

const NewsCardList = ({
  loggedIn,
  newsData,
  handleMoreNews,
  isMoreNewsBtn,
  handleFavorites,
}) => {
  const hideTitle = classNames('news__title', {
    'news_show-saved-news': loggedIn,
  });

  // const hideMoreBtn = classNames('news__more-news-btn', {
  //   'news_show-saved-news': loggedIn && !isMoreNewsBtn,
  // });
  const handleDeleteCard = async id => {
    try {
      await mainApi.removeFromFavorites(id);
    } catch (err) {
      console.log(err);
    }
  };
  // Отрисовка кнопки с отрисовкой новостей
  const buttonRender = () =>
    !isMoreNewsBtn || loggedIn ? (
      <button
        className="news__more-news-btn"
        type="button"
        onClick={handleMoreNews}
      >
        Показать еще
      </button>
    ) : (
      ''
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
            />
          ))}
        </ul>
        {buttonRender()}
      </div>
    </section>
  );
};

export default NewsCardList;
