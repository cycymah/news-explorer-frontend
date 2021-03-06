const BASE_URL = 'https://api.ethosy.students.nomoreparties.space';

const authApiSignup = (password, email, name) => {
  const url = `${BASE_URL}/signup`;
  const payload = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name }),
  };

  return fetch(url, payload).then(res =>
    res.status === 200 || res.status === 201
      ? res.json()
      : Promise.reject(`Ошибка: ${res.status}`)
  );
};

const authApiSignin = (password, email) => {
  const url = `${BASE_URL}/signin`;
  const payload = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  };

  return fetch(url, payload).then(res =>
    res.status === 200 || res.status === 201
      ? res.json()
      : Promise.reject(`Ошибка: ${res.status}`)
  );
};
const authApiCheck = token => {
  const url = `${BASE_URL}/users/me`;
  const payload = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  return fetch(url, payload).then(res =>
    res.status === 200 ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  );
};

export { authApiSignin, authApiSignup, authApiCheck };
