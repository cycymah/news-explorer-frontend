import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';
import { news } from '../../constants/news';
import classNames from 'classnames';

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
              key={i}
              title={oneNews.title}
              image={oneNews.image}
              data={oneNews.date}
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
