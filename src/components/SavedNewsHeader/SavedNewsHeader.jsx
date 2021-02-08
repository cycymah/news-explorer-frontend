import './SavedNewsHeader.css';

const SavedNewsHeader = () => {
  return (
    <div className="saved-news__header">
      <span className="saved-news__info">Сохранённые статьи</span>
      <h2 className="saved-news__title">Грета, у вас 5 сохранённых статей</h2>
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
