import React, { useState } from 'react';
import { Route, Switch, useHistory, BrowserRouter } from 'react-router-dom';

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
  // const auth = true;

  const addModalEscEvent = () => {
    document.addEventListener('keyup', handleEscModal);
  };

  const switchModal = () => {
    handleClosePopups();
  };

  const handleOpenAuthModal = () => {
    console.log('click');
    // switchModal();
    setAuthModalOpen(true);
    addModalEscEvent();
  };

  const handleOpenRegModal = () => {
    switchModal();
    setRegModalOpen(true);
  };

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
      <div className="fon">
        <Header handlePopupOpen={handleOpenAuthModal} />
        <SearchForm />
      </div>
      <Main>
        <Switch>
          <Route exact path="/">
            <NewsCardList />
            <About />
          </Route>
          <Route path="/saved-news">
            <SavedNews />
          </Route>
        </Switch>
      </Main>

      <PopupModal
        // isOpen={isRegModalOpen}
        handleClosePopup={handleClosePopups}
        LinkName="Авторизоваться"
        title="Регистрация"
        textButton="Зарегистрироваться"
        name="registration"
      />

      <PopupModal
        isOpen={isAuthModalOpen}
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
