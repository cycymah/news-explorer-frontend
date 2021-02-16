import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';

import './App.css';
import Main from '../Main/Main';
import About from '../About/About';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import newsApi from '../../utils/NewsApi';
import mainApi from '../../utils/MainApi';
import ModalForm from '../ModalForm/ModalForm';
import SavedNews from '../SavedNews/SavedNews';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import { CurrentUserContext } from '../../utils/context';
import Notification from '../Notification/Notification';
import { NEWS_PER_PAGE } from '../../constants/appConstants';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { authApiSignin, authApiSignup, authApiCheck } from '../../utils/Auth';

function App() {
  let array = [];
  let fromStorage = JSON.parse(localStorage.getItem('news'));

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
  const [isWarningOpen, setWarningOpen] = useState(false);
  const [endSliced, setEndSliced] = useState(NEWS_PER_PAGE);

  const localStorageNews = fromStorage
    ? fromStorage.slice(0, NEWS_PER_PAGE)
    : [];

  // Данные новостей
  const [slicedNews, setSlicedNews] = useState(localStorageNews);

  // Состояния
  const [isLoading, setIsLoading] = useState(false); // Данные загружаются
  const [isNotFoundPage, setIsNotFound] = useState(false); // Страница не найдена

  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    initialUserData();
    initialUserNews();
    loopNewsSlice(0, NEWS_PER_PAGE);
  }, []);

  // Получаем информацию о пользователе
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

  // Получаем сохраненные новости
  const initialUserNews = async () => {
    try {
      const savedNews = await mainApi.getSavedNews();
      localStorage.setItem('savedNews', JSON.stringify(savedNews));
    } catch (err) {
      console.error(err);
    }
  };

  // Запрос для поиска
  const handleSearch = async ({ search }) => {
    setEndSliced(NEWS_PER_PAGE);
    setIsNotFound(false);
    setIsLoading(true);

    try {
      const { articles, totalResults } = await newsApi.searchNews(search, 100);

      array.push(articles);
      setSlicedNews([]);
      const withKeywords = articles.map(article => ({
        ...article,
        keyword: search,
      }));

      const dataForStorage = JSON.stringify(withKeywords);
      localStorage.setItem('news', dataForStorage);

      if (totalResults === 0) {
        return setIsNotFound(true);
      } else if (totalResults > 3) {
        setSlicedNews(withKeywords.slice(0, NEWS_PER_PAGE));
      } else {
        setSlicedNews(withKeywords);
      }
    } catch (err) {
      setWarningOpen(true);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Регистрация
  const registrationOnSubmit = async ({ name, password, email }) => {
    setIsLoading(true);
    try {
      const { _id } = await authApiSignup(password, email, name);

      if (_id && !isAuthModalOpen) {
        handleOpenConfirmModal();
      }
    } catch (err) {
      console.error(err);
      setWarningOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Вход
  const signInOnSubmit = async ({ password, email }) => {
    setIsLoading(true);
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
      setWarningOpen(true);
    } finally {
      setIsLoading(false);
      handleClosePopups();
    }
  };

  // Выход
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/');
  };

  // Добавить запись в избранное
  const handleFavorites = async data => {
    try {
      const responseNews = await mainApi.addNewsCard(data);
      initialUserNews();
      return responseNews;
    } catch (err) {
      console.error(err);
    }
  };

  // Удалить из избранного
  const handleDeleteCard = async id => {
    try {
      await mainApi.removeFromFavorites(id);
    } catch (err) {
      console.error(err);
    }
  };

  const loopNewsSlice = (start, end) => {
    const slicedNews = fromStorage.slice(start, end);
    array = [...array, ...slicedNews];
    setSlicedNews(array);
  };

  // Показываем 3 новости по клику
  const handleMoreNews = () => {
    loopNewsSlice(0, endSliced + NEWS_PER_PAGE);
    setEndSliced(endSliced + NEWS_PER_PAGE);
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
    document.removeEventListener('keyup', handleEscModal); // снимаем слушаеть при закрытии тут
  };

  const newsListRender = () =>
    isLoading || isNotFoundPage || slicedNews.length === 0 ? (
      ''
    ) : (
      <NewsCardList
        newsData={slicedNews}
        handleMoreNews={handleMoreNews}
        loggedIn={loggedIn}
        handleFavorites={handleFavorites}
        handleOpenRegModal={handleOpenRegModal}
        handleDeleteCard={handleDeleteCard}
        searchNews={fromStorage}
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
              handleOpenAuthModal={handleOpenAuthModal}
              handleDeleteCard={handleDeleteCard}
              isLoading={isLoading}
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
          isLoading={isLoading}
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
          isLoading={isLoading}
        />

        <ConfirmModal
          isConfirmModalOpen={isConfirmModalOpen}
          title={'Пользователь успешно зарегистрирован!'}
          textButton={'Войти'}
          handleOpenAuthModal={handleOpenAuthModal}
          handleClosePopup={handleClosePopups}
        />
        <Notification isOpen={isWarningOpen} onClose={setWarningOpen} />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
