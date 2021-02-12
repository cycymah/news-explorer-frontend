class MainApi {
  constructor(options) {
    this._serverUrl = options.url;
    this._headers = options.headers;
  }

  getSavedNews = () =>
    fetch(`${this._serverUrl}/articles`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._errorCheck);

  addNewCard = data =>
    fetch(`${this._serverUrl}/articles`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._errorCheck);

  removeFromFavorites = id =>
    fetch(`${this._serverUrl}/articles/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._errorCheck);

  _errorCheck = res =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

const localToken = localStorage.getItem('jwt');

const mainApi = new MainApi({
  url: 'https://api.cycymah.students.nomoreparties.space',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localToken}`,
  },
});

export default mainApi;
