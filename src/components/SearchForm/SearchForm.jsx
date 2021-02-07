import './SearchForm.css';

function SearchForm() {
  return (
    <section className="search">
      <h1 className="search__title">Что творится в мире?</h1>
      <p className="search__subtitle">
        Находите самые свежие статьи на&nbsp;любую тему и&nbsp;сохраняйте
        в&nbsp;своём личном кабинете.
      </p>
      <form className="search__form">
        <input
          name="search"
          type="text"
          className="search__input"
          placeholder="Введите тему новости"
          autoComplete="off"
        />
        <button type="submit" className="search__btn">
          Искать
        </button>
      </form>
    </section>
  );
}

export default SearchForm;
