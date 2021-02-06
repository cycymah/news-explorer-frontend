import './Main.css';
import NotFound from '../NotFound/NotFound';
import Preloader from '../Preloader/Preloader';

const Main = ({ children, isNotFoundPage, isLoading }) => {
  return (
    <main className="main">
      {!isLoading || <Preloader />}
      {!isNotFoundPage || <NotFound />}
      {children}
    </main>
  );
};

export default Main;
