import './NotFound.css';
import notFoundImage from '../../images/not-found.png';

const NotFound = () => {
  return (
    <section className="not-found">
      <div className="not-found__content">
        <img src={notFoundImage} alt="Не найдено" />
        <h2 className="not-found__title">Ничего не найдено</h2>
        <p className="not-found__subtitle">
          К сожалению по вашему запросу ничего не найдено.
        </p>
      </div>
    </section>
  );
};

export default NotFound;
