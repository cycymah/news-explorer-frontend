import classNames from 'classnames';
import React, { useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import './App.css';
import Main from '../Main/Main';
import About from '../About/About';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ModalForm from '../ModalForm/ModalForm';
import SavedNews from '../SavedNews/SavedNews';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import ConfirmModal from '../ConfirmModal/ConfirmModal';

function App() {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isRegModalOpen, setRegModalOpen] = useState(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const currentRoute = useLocation().pathname;
  const isRootPath = currentRoute === '/';

  const fonClasses = classNames('fon', {
    fon_hide: !isRootPath,
  });

  // Переменные состояния интерфейса
  const isAutoriz = true; // Авторизованный и нет пользователь
  const isNotFoundPage = false; // страница не найдена
  const isLoading = false; // Загрузка

  // Закрываем по ESC
  const handleEscModal = evt => {
    if (evt.key === 'Escape') {
      handleClosePopups();
    }
  };

  // Слушатели для ESC
  const addModalEscEvent = () => {
    document.addEventListener('keyup', handleEscModal);
  };

  // Открыть модалку аутентификации
  const handleOpenAuthModal = () => {
    handleClosePopups();
    setAuthModalOpen(true);
    addModalEscEvent();
  };

  // Открыть модалку регистрации
  const handleOpenRegModal = () => {
    handleClosePopups();
    setRegModalOpen(true);
    addModalEscEvent();
  };

  // Открываем модалку с подтверждением входа пользователя
  const handleOpenConfirmModal = () => {
    handleClosePopups();
    setConfirmModalOpen(true);
    addModalEscEvent();
  };

  // Закрыть все модалки
  const handleClosePopups = () => {
    setAuthModalOpen(false);
    setRegModalOpen(false);
    setConfirmModalOpen(false);
    document.removeEventListener('keyup', handleEscModal);
  };

  return (
    <div className="page">
      <div className={fonClasses}>
        <Header
          handlePopupOpen={handleOpenAuthModal}
          isAutoriz={isAutoriz}
          isRootPath={isRootPath}
        />
        {!isRootPath || <SearchForm />}
      </div>
      <Main isNotFoundPage={isNotFoundPage} isLoading={isLoading}>
        <Switch>
          <Route exact path="/">
            {isLoading || isNotFoundPage ? '' : <NewsCardList />}
            <About />
          </Route>
          <Route path="/saved-news">
            <SavedNews />
          </Route>
        </Switch>
      </Main>

      <ModalForm
        isOpenAuth={isRegModalOpen}
        handleClosePopup={handleClosePopups}
        handleOpenAuth={handleOpenAuthModal}
        handleOpenConfirmModal={handleOpenConfirmModal}
        linkName="Авторизоваться"
        title="Регистрация"
        textButton="Зарегистрироваться"
        name="registration"
      />

      <ModalForm
        isOpenReg={isAuthModalOpen}
        handleOpenRegModal={handleOpenRegModal}
        handleClosePopup={handleClosePopups}
        linkName="Зарегистрироваться"
        title="Вход"
        textButton="Войти"
        name="auth"
      />

      <ConfirmModal
        isConfirmModalOpen={isConfirmModalOpen}
        title={'Пользователь успешно зарегистрирован!'}
        textButton={'Войти'}
        handleOpenAuthModal={handleOpenAuthModal}
      />
      <Footer />
    </div>
  );
}

export default App;
