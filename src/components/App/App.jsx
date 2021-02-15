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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { authApiSignin, authApiSignup, authApiCheck } from '../../utils/Auth';

function App() {
  let endSliced = 3;
  let fromStorage = JSON.parse(localStorage.getItem('news'));

  const localStorageNews = fromStorage ? fromStorage.slice(0, endSliced) : [];
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
  const [searchNews, setSearchNews] = useState(localStorageNews);
  const [slicedNews, setSlicedNews] = useState(localStorageNews);

  // Состояния
  const [isLoading, setIsLoading] = useState(false); // Данные загружаются
  const [isNotFoundPage, setIsNotFound] = useState(false); // Страница не найдена
  const [isMoreNewsBtn, setIsMoreNewsBtn] = useState(false);
  const [searchSrt, setSearchStr] = useState('');

  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    initialUserData();
    initialUserNews();
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
    endSliced = 3;
    setIsNotFound(false);
    setIsLoading(true);
    setSearchStr(search);

    try {
      const { articles, totalResults } = await newsApi.searchNews(search, 100);

      setSearchNews(articles);
      const withKeywords = articles.map(article => ({
        ...article,
        keyword: search,
      }));

      const dataForStorage = JSON.stringify(withKeywords);
      localStorage.setItem('news', dataForStorage);
      if (totalResults === 0) {
        return setIsNotFound(true);
      } else if (totalResults > 3) {
        setIsMoreNewsBtn(true);
        const newNewsList = withKeywords.slice(0, endSliced);
        return setSlicedNews(newNewsList);
      }

      setSlicedNews(withKeywords);
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

  // Показываем 3 новости по клику
  const handleMoreNews = () => {
    const newNewsList = searchNews.slice(0, endSliced + 3);
    setSlicedNews(newNewsList);
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
    isLoading || isNotFoundPage || searchNews.length === 0 ? (
      ''
    ) : (
      <NewsCardList
        newsData={slicedNews || localStorageNews}
        handleMoreNews={handleMoreNews}
        isMoreNewsBtn={isMoreNewsBtn}
        loggedIn={loggedIn}
        handleFavorites={handleFavorites}
        handleOpenRegModal={handleOpenRegModal}
        handleDeleteCard={handleDeleteCard}
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
