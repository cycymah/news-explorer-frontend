class NewsApi {
  constructor({ apikey, url, pastDate, currentDate }) {
    this._apiKey = apikey;
    this._url = url;
    this._currentDate = currentDate;
    this._pastDate = pastDate;
  }

  searchNews = (searchStr, perPage) => {
    const queryParam = `${this._url}?q=${searchStr}&perPage=${perPage}&from=${this._pastDate}&to=${this._currentDate}&apiKey=${this._apiKey}`;
    return fetch(queryParam, {
      method: 'GET',
    }).then(this._errorCheck);
  };
  _errorCheck = res =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

const newsApi = new NewsApi({
  apikey: 'e1c3647fd7d242deaaf918a800c669d6',
  pastDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  currentDate: new Date(Date.now()).toISOString(),
  url: 'https://newsapi.org/v2/everything',
});

export default newsApi;
