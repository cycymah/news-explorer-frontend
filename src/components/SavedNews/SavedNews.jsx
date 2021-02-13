import './SavedNews.css';
import React, { useState } from 'react';
import NewsCard from '../NewsCard/NewsCard';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import mainApi from '../../utils/MainApi';

const SavedNews = () => {
  const [savedNews, setSavedNews] = useState(
    JSON.parse(localStorage.getItem('news'))
  );

  const handleFavoriteDelete = async id => {
    try {
      await mainApi.removeFromFavorites(id);
      const filteredNews = savedNews.filter(oneNews => oneNews._id !== id);
      setSavedNews(filteredNews);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <SavedNewsHeader savedNews={savedNews} />
      <section className="saved-news">
        <div className="saved-news__container">
          <ul className="saved-news__list">
            {savedNews.map((oneNews, i) => (
              <NewsCard
                key={i}
                saved={true}
                title={oneNews.title}
                image={oneNews.image}
                date={oneNews.date}
                source={oneNews.source}
                description={oneNews.text}
                link={oneNews.link}
                keyword={oneNews.keyword}
                id={oneNews._id}
                handleFavoriteDelete={handleFavoriteDelete}
              />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default SavedNews;
