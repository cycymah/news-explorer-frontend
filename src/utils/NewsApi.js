class NewsApi {
  constructor({ apikey }) {
    this._apiKey = apikey;
  }

  searchNews = ({ queryParams }) =>
    fetch(
      `https://newsapi.org/v2/top-headlines?${queryParams}&country=ru&apiKey=${this._apiKey}`,
      {
        method: 'GET',
      }
    ).then(this._errorCheck);

  _errorCheck = res =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

const localToken = localStorage.getItem('jwt');

const newsApi = new NewsApi({
  apikey: 'e1c3647fd7d242deaaf918a800c669d6',
});

export default newsApi;
