import './SavedNews.css';
import { news } from '../../constants/news';
import NewsCard from '../NewsCard/NewsCard';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';

const SavedNews = () => {
  return (
    <>
      <SavedNewsHeader />
      <section className="saved-news">
        <div className="saved-news__container">
          <ul className="saved-news__list">
            {news.map((oneNews, i) => (
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
              />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default SavedNews;
