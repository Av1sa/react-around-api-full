class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _getResponseData(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  //GET Get initial cards
  getInitialCards(token) {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => this._getResponseData(res));
  }

  //GET Get user info
  getUserInfo(token) {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => this._getResponseData(res));
  }

  //PATCH Set user info
  setUserInfo({ name, about, token }) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, about }),
    }).then((res) => this._getResponseData(res));
  }

  //PATCH Set user avatar
  setUserAvatar({ avatar, token }) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ avatar }),
    }).then((res) => this._getResponseData(res));
  }

  //POST Add new place
  addCard({ name, link, token }) {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
      body: JSON.stringify({ name, link }),
    }).then((res) => this._getResponseData(res));
  }

  //DELETE Remove place
  removeCard(cardId, token) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
      method: 'DELETE',
    }).then((res) => this._getResponseData(res));
  }

  //PUT/DELETE Change Like status
  changeLikeCardStatus(cardId, method, token) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes/`, {
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
      method: method,
    }).then((res) => this._getResponseData(res));
  }

  //Get initial data
  getAppInfo(token) {
    return Promise.all([this.getInitialCards(token), this.getUserInfo(token)]);
  }
}

const api = new Api({
  baseUrl: 'https://api.mm15.students.nomoreparties.site',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
