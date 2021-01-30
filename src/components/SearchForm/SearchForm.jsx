import './SearchForm.css';
import { useForm } from 'react-hook-form';

function SearchForm() {
  const { register, errors } = useForm({ mode: 'onChange' });

  const handleSubmit = evt => {
    evt.preventDefault();
  };
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
          ref={register({
            required: { value: true, message: 'Заполните это поле' },
          })}
          maxLength="40"
          placeholder="Введите тему новости"
          autoComplete="off"
        />
        <button
          type="submit"
          className="search__btn"
          disabled={errors.search && true}
          onSubmit={handleSubmit}
        >
          Искать
          {/*{formSubmitState ? 'Загрузка...' : 'Искать'}*/}
        </button>
      </form>
    </section>
  );
}

export default SearchForm;
