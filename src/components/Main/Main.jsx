import './Main.css';
import NotFound from '../NotFound/NotFound';
import About from '../About/About';
import NewsCardList from '../NewsCardList/NewsCardList';

const Main = () => {
  return (
    <main className="main">
      <NewsCardList />
      {/*<NotFound />*/}
      {/*<Preloader />*/}
      <About />
    </main>
  );
};

export default Main;
