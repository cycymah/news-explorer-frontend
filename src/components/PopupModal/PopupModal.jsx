import './PopupModal.css';
import classNames from 'classnames';
import FormInput from '../FormInput/FormInput';
import React, { useState } from 'react';
import {
  emailValidationConfig,
  passwordValidationConfig,
  nameValidationConfig,
} from '../../constants/form';

const PopupModal = ({
  name,
  onSubmit,
  handleClosePopup,
  isOpenAuth,
  isOpenReg,
  linkName,
  title,
  handleOpenAuth,
  textButton,
  handleOpenRegModal,
}) => {
  const [isValidName, checkValidityName] = useState(false);
  const [isValidPassword, checkValidityPassword] = useState(false);
  const [isValidEmail, checkValidityEmail] = useState(false);

  const popupToggle = classNames('modal', {
    modal_active: isOpenAuth || isOpenReg,
  });

  const buttonValidityClass = classNames('form__submit-btn', {
    'form__submit-btn_inactive': isValidPassword || isValidEmail,
  });

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
          onSubmit={onSubmit}
          noValidate
        >
          <FormInput
            getFormValid={checkValidityEmail}
            label="Email"
            validationConfig={emailValidationConfig}
            name="email"
            placeholder="Введите почту"
          />
          <FormInput
            getFormValid={checkValidityPassword}
            label="Пароль"
            validationConfig={passwordValidationConfig}
            name="password"
            placeholder="Введите пароль"
          />
          {isOpenReg || (
            <FormInput
              getFormValid={checkValidityName}
              label="Имя"
              validationConfig={nameValidationConfig}
              name="name"
              placeholder="Введите имя"
            />
          )}
          <button
            className={buttonValidityClass}
            type="submit"
            disabled={isValidPassword || isValidEmail}
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

export default PopupModal;
