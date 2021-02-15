import React, { useContext, useState, useEffect } from 'react';

import './SavedNewsHeader.css';
import { CurrentUserContext } from '../../utils/context';

const SavedNewsHeader = ({ savedNews }) => {
  const [sortedKeywords, setSortedKeywords] = useState('');
  const { name } = useContext(CurrentUserContext);

  useEffect(() => {
    const sameWords = findSame();
    const sortedByPopularity = sortByNumber(sameWords);
    setSortedKeywords(sortedByPopularity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Поиск одинаковых ключевых слов и запись в объект
  const findSame = () => {
    const mass = savedNews.map(news => news.keyword);
    const news = mass.reduce((acc, elem) => {
      acc[elem] = (acc[elem] || 0) + 1;
      return acc;
    }, {});
    return news;
  };

  // Сортировка по возрастанию ключевых слов
  const sortByNumber = keywords => {
    return Object.keys(keywords).sort(function (a, b) {
      return keywords[b] - keywords[a];
    });
  };

  const returnTitleString = () => {
    if (savedNews.length === 1) {
      return 'сохранённая статья';
    } else if (savedNews.length > 4) {
      return 'сохранённых статей';
    }
    return 'сохраненные статьи';
  };

  return (
    <div className="saved-news__header">
      <span className="saved-news__info">Сохранённые статьи</span>
      <h2 className="saved-news__title">{`${name}, у вас ${
        savedNews.length
      } ${returnTitleString()}`}</h2>
      <p className="saved-news__keywords">
        По ключевым словам:&ensp;
        <span className="saved-news__keywords_bold">{sortedKeywords[0]}</span>
        {!sortedKeywords[1] || (
          <span className="saved-news__keywords_bold">
            ,&ensp;{sortedKeywords[1]}
          </span>
        )}
        {sortedKeywords.length > 3 ? (
          <>
            &ensp;и&ensp;
            <span className="saved-news__keywords_bold">
              {sortedKeywords.length}-м другим
            </span>
          </>
        ) : (
          ''
        )}
      </p>
    </div>
  );
};

export default SavedNewsHeader;
