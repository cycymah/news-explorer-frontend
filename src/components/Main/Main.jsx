import './Main.css';
import NotFound from '../NotFound/NotFound';
import About from '../About/About';
import NewsCardList from '../NewsCardList/NewsCardList';
import Preloader from '../Preloader/Preloader';

const Main = ({ children }) => {
  return (
    <main className="main">
      {/*<Preloader />*/}
      {/*<NotFound />*/}
      {children}
    </main>
  );
};

export default Main;
