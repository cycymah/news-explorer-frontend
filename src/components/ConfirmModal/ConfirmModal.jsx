import classNames from 'classnames';

import './ConfirmModal.css';

const ConfirmModal = ({
  isConfirmModalOpen,
  handleClosePopup,
  textButton,
  title,
  handleOpenAuthModal,
}) => {
  const popupToggle = classNames('modal', {
    modal_active: isConfirmModalOpen,
  });

  return (
    <div className={popupToggle}>
      <div onClick={handleClosePopup} className="modal__overlay" />
      <div className="confirm">
        <button
          className="confirm__close-btn"
          type="button"
          onClick={handleClosePopup}
        />
        <h2 className="confirm__title">{title}</h2>
        <a
          // eslint-disable-next-line
          href={null}
          className="confirm__auth-link"
          onClick={handleOpenAuthModal}
        >
          {textButton}
        </a>
      </div>
    </div>
  );
};

export default ConfirmModal;
