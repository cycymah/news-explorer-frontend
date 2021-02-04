import './PopupModal.css';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const PopupModal = ({
  name,
  onSubmit,
  handleClosePopup,
  isOpen,
  linkName,
  title,
  textButton,
  linkTo,
}) => {
  const popupToggle = classNames('modal', { modal_active: isOpen });
  console.log(isOpen, 'inAuth');
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
          <label className="form__label">
            Email
            <input
              type="text"
              className="form__input"
              id="email"
              placeholder="Введите почту"
              name="email"
              minLength="2"
              required
              // value={''}
              // onChange={}
            />
          </label>
          <label className="form__label">
            Пароль
            <input
              className="form__input"
              id="password-input"
              placeholder="Введите пароль"
              name="password"
              minLength="4"
              type="text"
              required
              // value={}
              // onChange={}
            />
          </label>
          <label className="form__label">
            Имя
            <input
              className="form__input"
              id="name-input"
              placeholder="Введите имя"
              name="name"
              minLength="4"
              type="text"
              required
              // value={}
              // onChange={}
            />
          </label>
          <button className="form__submit-btn" type="submit" disabled>
            {textButton}
          </button>
          <p className="form__auth-text">
            или&nbsp;
            <a href="#" className="form__auth-link">
              {linkName}
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default PopupModal;
