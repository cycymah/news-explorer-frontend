import classNames from 'classnames';

import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';
import { news } from '../../constants/news';

const NewsCardList = ({ auth }) => {
  const hideTitle = classNames('news__title', {
    'news_show-saved-news': auth,
  });

  const hideMoreBtn = classNames('news__more-news-btn', {
    'news_show-saved-news': auth,
  });

  return (
    <section className="news">
      <div className="news__container">
        <h2 className={hideTitle}>Результаты поиска</h2>
        <ul className="news__list">
          {news.map((oneNews, i) => (
            <NewsCard
              saved={false}
              key={i}
              title={oneNews.title}
              image={oneNews.image}
              date={oneNews.date}
              source={oneNews.source}
              description={oneNews.text}
              link={oneNews.link}
            />
          ))}
        </ul>
        <button className={hideMoreBtn} type="button">
          Показать еще
        </button>
      </div>
    </section>
  );
};

export default NewsCardList;
