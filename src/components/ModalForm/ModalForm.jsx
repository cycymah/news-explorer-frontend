import classNames from 'classnames';
import React, { useState } from 'react';

import './ModalForm.css';
import FormInput from '../FormInput/FormInput';
import {
  emailValidationConfig,
  passwordValidationConfig,
  nameValidationConfig,
} from '../../constants/form';

const ModalForm = ({
  name,
  handleClosePopup,
  isOpenAuth,
  isOpenReg,
  linkName,
  title,
  handleOpenAuth,
  textButton,
  handleOpenRegModal,
  registrationOnSubmit,
  handleSignIn,
  isLoading,
}) => {
  const [isValidName, checkValidityName] = useState(false);
  const [isValidPassword, checkValidityPassword] = useState(true);
  const [isValidEmail, checkValidityEmail] = useState(true);
  const [inputName, setInputName] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputEmail, setInputEmail] = useState('');

  const popupToggle = classNames('modal', {
    modal_active: isOpenAuth || isOpenReg,
  });

  const buttonValidityClass = classNames('form__submit-btn', {
    'form__submit-btn_inactive': isValidPassword || isValidEmail || isValidName,
  });

  // Субмит для регистрации открывает откывает модалку с успешной регистрацией
  const onSubmitForm = evt => {
    evt.preventDefault();
    if (isOpenReg) {
      handleSignIn({ email: inputEmail, password: inputPassword });
    } else {
      registrationOnSubmit({
        name: inputName,
        password: inputPassword,
        email: inputEmail,
      });
    }
  };

  return (
    <div className={popupToggle}>
      <div onClick={handleClosePopup} className="modal__overlay" />
      <div className="form">
        <button
          className="form__close-btn"
          type="button"
          onClick={handleClosePopup}
        />
        <h2 className="form__title">{title}</h2>
        <form
          action="#"
          className="form__section"
          name={name}
          onSubmit={onSubmitForm}
          noValidate
        >
          <FormInput
            getFormValid={checkValidityEmail}
            label="Email"
            validationConfig={emailValidationConfig}
            name="email"
            placeholder="Введите почту"
            getValue={setInputEmail}
            type="email"
          />
          <FormInput
            getFormValid={checkValidityPassword}
            label="Пароль"
            validationConfig={passwordValidationConfig}
            name="password"
            placeholder="Введите пароль"
            getValue={setInputPassword}
            type="password"
          />
          {isOpenReg || (
            <FormInput
              getFormValid={checkValidityName}
              label="Имя"
              validationConfig={nameValidationConfig}
              name="name"
              placeholder="Введите имя"
              getValue={setInputName}
              type="text"
            />
          )}
          <button
            className={buttonValidityClass}
            type="submit"
            disabled={
              isValidPassword || isValidEmail || isValidName || isLoading
            }
          >
            {textButton}
          </button>
          <p className="form__auth-text">
            или&nbsp;
            <a
              href="#"
              className="form__auth-link"
              onClick={isOpenReg ? handleOpenRegModal : handleOpenAuth}
            >
              {linkName}
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;
