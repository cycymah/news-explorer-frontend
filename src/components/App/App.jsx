import React, { useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import './App.css';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SavedNews from '../SavedNews/SavedNews';
import SearchForm from '../SearchForm/SearchForm';
import PopupModal from '../PopupModal/PopupModal';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';

function App() {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isRegModalOpen, setRegModalOpen] = useState(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const currentRoute = useLocation().pathname;
  const isSavedNewsPath = currentRoute === '/saved-news';

  const fonClasses = classNames('fon', {
    fon_hide: isSavedNewsPath,
  });

  // Переменные состояния интерфейса
  const isAutoriz = false;
  const isNotFoundPage = false;
  const isLoading = false;

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

  // Закрыть все модалки
  const handleClosePopups = () => {
    setAuthModalOpen(false);
    setRegModalOpen(false);
    setConfirmModalOpen(false);
    document.removeEventListener('keyup', handleEscModal);
  };

  const handleEscModal = evt => {
    if (evt.key === 'Escape') {
      handleClosePopups();
    }
  };

  return (
    <div className="page">
      <div className={fonClasses}>
        <Header
          handlePopupOpen={handleOpenAuthModal}
          isAutoriz={isAutoriz}
          currentRoute={currentRoute}
        />
        {isSavedNewsPath || <SearchForm />}
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

      <PopupModal
        isOpenAuth={isRegModalOpen}
        handleClosePopup={handleClosePopups}
        handleOpenAuth={handleOpenAuthModal}
        linkName="Авторизоваться"
        title="Регистрация"
        textButton="Зарегистрироваться"
        name="registration"
      />

      <PopupModal
        isOpenReg={isAuthModalOpen}
        handleOpenRegModal={handleOpenRegModal}
        handleClosePopup={handleClosePopups}
        linkName="Зарегистрироваться"
        title="Вход"
        textButton="Войти"
        name="auth"
      />

      <Footer />
    </div>
  );
}

export default App;
