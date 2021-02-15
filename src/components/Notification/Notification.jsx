import React from 'react';

import wrong from '../../images/notok.svg';
import './Notification.css';

//Попап с увеличенной картинкой
const PoppupNotification = ({ isOpen, onClose }) => {
  const handleClose = () => {
    onClose(false);
  };

  return (
    <div
      className={`modal page__modal modal_target_notification ${
        isOpen ? 'modal_active' : ''
      }`}
    >
      <div
        onClick={handleClose}
        className="modal__overlay modal__overlay_background_dark"
      />
      <div className="notification">
        <button
          onClick={handleClose}
          className="notification__close-btn"
          type="button"
        />
        <div className="notification__box">
          <img src={wrong} alt="Что-то пошло не так" />

          <span className="notification__text">
            "Что-то пошло не так! Попробуйте ещё раз."
          </span>
        </div>
      </div>
    </div>
  );
};

export default PoppupNotification;
