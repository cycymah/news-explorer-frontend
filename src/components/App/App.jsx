import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';

import './App.css';
import Main from '../Main/Main';
import About from '../About/About';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import newsApi from '../../utils/NewsApi';
import ModalForm from '../ModalForm/ModalForm';
import SavedNews from '../SavedNews/SavedNews';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import { CurrentUserContext } from '../../utils/context';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { authApiSignin, authApiSignup, authApiCheck } from '../../utils/Auth';
import mainApi from '../../utils/MainApi';

function App() {
  const currentRoute = useLocation().pathname;
  const isRootPath = currentRoute === '/';
  const history = new useHistory();
  const localToken = localStorage.getItem('jwt');
  const fonClasses = classNames('fon', {
    fon_hide: !isRootPath,
  });

  // Модалки и их состояние
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isRegModalOpen, setRegModalOpen] = useState(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

  // Данные новостей
  const [searchNews, setSearchNews] = useState([]);
  const [slicedNews, setSlicedNews] = useState([]);

  // Состояния
  const [isLoading, setIsLoading] = useState(false); // Данные загружаются
  const [isNotFoundPage, setIsNotFound] = useState(false); // Страница не найдена
  const [isMoreNewsBtn, setIsMoreNewsBtn] = useState(false);
  const [endSlice, setEndSlice] = useState(3); // Счетчик для нужного кол-ва эл-тов массива

  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    initialUserData();
    initialUserNews();
  }, []);

  const initialUserData = async () => {
    if (localToken) {
      try {
        const { email, name, _id } = await authApiCheck(localToken);

        if (email) {
          setLoggedIn(true);
          history.push('/');
          setCurrentUser({ email, name, _id });
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const initialUserNews = async () => {
    try {
      const savedNews = await mainApi.getSavedNews();
      localStorage.setItem('news', JSON.stringify(savedNews));
    } catch (err) {
      console.error(err);
    }
  };

  // Запрос для поиска
  const handleSearch = async ({ search }) => {
    setIsNotFound(false);
    setIsLoading(true);

    try {
      const { articles, totalResults } = await newsApi.searchNews(search, 100);

      setSearchNews(articles);

      if (totalResults === 0) {
        return setIsNotFound(true);
      } else if (totalResults > 3) {
        setIsMoreNewsBtn(true);
        setEndSlice(endSlice + 3);
        return setSlicedNews(articles.slice(0, endSlice));
      }

      setSlicedNews(articles);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Регистрация
  const registrationOnSubmit = async ({ name, password, email }) => {
    try {
      const { _id } = await authApiSignup(password, email, name);

      if (_id && !isAuthModalOpen) {
        handleOpenConfirmModal();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Вход
  const signInOnSubmit = async ({ password, email }) => {
    try {
      const { token, name } = await authApiSignin(password, email);

      if (token) {
        localStorage.setItem('jwt', token);
        setCurrentUser({ name });
        setLoggedIn(true);
        history.push('/');
      }
    } catch (err) {
      console.error('Нет токена', err);
    } finally {
      handleClosePopups();
    }
  };

  // Выход
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/');
  };

  // Показываем 3 новости по клику
  const handleMoreNews = () => {
    setEndSlice(endSlice + 3);
    setSlicedNews(searchNews.slice(0, endSlice));
  };

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

  const newsListRender = () =>
    isLoading || isNotFoundPage || searchNews.length === 0 ? (
      ''
    ) : (
      <NewsCardList
        newsData={slicedNews}
        handleMoreNews={handleMoreNews}
        isMoreNewsBtn={isMoreNewsBtn}
        loggedIn={loggedIn}
      />
    );

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className={fonClasses}>
          <Header
            handlePopupOpen={handleOpenAuthModal}
            isAutoriz={loggedIn}
            isRootPath={isRootPath}
            handleLogout={handleLogout}
          />
          {!isRootPath || <SearchForm handleSearch={handleSearch} />}
        </div>
        <Main isNotFoundPage={isNotFoundPage} isLoading={isLoading}>
          <Switch>
            <Route exact path="/">
              {newsListRender()}
              <About />
            </Route>
            <ProtectedRoute
              exact
              path="/saved-news"
              loggedIn={loggedIn}
              component={SavedNews}
            />
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
          registrationOnSubmit={registrationOnSubmit}
        />

        <ModalForm
          isOpenReg={isAuthModalOpen}
          handleOpenRegModal={handleOpenRegModal}
          handleClosePopup={handleClosePopups}
          handleSignIn={signInOnSubmit}
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
          handleClosePopup={handleClosePopups}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
