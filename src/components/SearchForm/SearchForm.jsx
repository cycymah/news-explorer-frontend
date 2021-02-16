import classNames from 'classnames';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import './SearchForm.css';
import { searchValidationConfig } from '../../constants/form';

const SearchForm = ({ handleSearch, isLoading }) => {
  const [isDisabledBtn, setButtonDisabled] = useState(true);

  const { register, handleSubmit, errors } = useForm({ mode: 'onChange' });
  const validation = register(searchValidationConfig);

  const buttonValidityClass = classNames('search__btn', {
    search__btn_inactive: isDisabledBtn,
  });

  const onChangeValidation = () =>
    errors.search ? setButtonDisabled(true) : setButtonDisabled(false);

  return (
    <section className="search">
      <h1 className="search__title">Что творится в мире?</h1>
      <p className="search__subtitle">
        Находите самые свежие статьи на&nbsp;любую тему и&nbsp;сохраняйте
        в&nbsp;своём личном кабинете.
      </p>
      <form className="search__form" onSubmit={handleSubmit(handleSearch)}>
        <input
          name="search"
          type="text"
          className="search__input"
          placeholder="Введите тему новости"
          autoComplete="off"
          ref={validation}
          onChange={onChangeValidation}
        />
        <button
          type="submit"
          className={buttonValidityClass}
          disabled={isDisabledBtn || isLoading}
        >
          Искать
        </button>
      </form>
    </section>
  );
};

export default SearchForm;
