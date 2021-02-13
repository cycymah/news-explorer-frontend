import './SavedNewsHeader.css';
import { useContext } from 'react';
import { CurrentUserContext } from '../../utils/context';

const SavedNewsHeader = ({ savedNews }) => {
  const { name } = useContext(CurrentUserContext);
  const returnTitleString = () => {
    if (savedNews.length === 1) {
      return 'сохранённая статья';
    } else if (savedNews.length === 2 || 3 || 4) {
      return 'сохраненные статьи';
    }
    return 'сохранённых статей';
  };

  return (
    <div className="saved-news__header">
      <span className="saved-news__info">Сохранённые статьи</span>
      <h2 className="saved-news__title">{`${name}, у вас ${
        savedNews.length
      } ${returnTitleString()}`}</h2>
      <p className="saved-news__keywords">
        По ключевым словам:&ensp;
        <span className="saved-news__keywords_bold">Природа,</span>&ensp;
        <span className="saved-news__keywords_bold">Тайга</span>&ensp;и&ensp;
        <span className="saved-news__keywords_bold">2-м другим</span>
      </p>
    </div>
  );
};

export default SavedNewsHeader;
