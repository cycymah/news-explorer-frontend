import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';
import { news } from '../../constants/news';

const NewsCardList = () => {
  return (
    <section className="news">
      <div className="news__container">
        <h2 className="news__title">Результаты поиска</h2>
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
        <button className="news__more-news-btn" type="button">
          Показать еще
        </button>
      </div>
    </section>
  );
};

export default NewsCardList;
