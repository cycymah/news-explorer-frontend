const BASE_URL = 'https://api.cycymah.students.nomoreparties.space';

const authApi = (password, email, sign) => {
  const url = `${BASE_URL}/${sign}`;
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

export { authApi, authApiCheck };
