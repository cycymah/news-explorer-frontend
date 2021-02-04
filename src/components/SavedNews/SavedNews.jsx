import './SavedNews.css';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';

const SavedNews = ({ auth }) => {
  return (
    <>
      <SavedNewsHeader />
      <NewsCardList auth={auth} />
    </>
  );
};

export default SavedNews;
