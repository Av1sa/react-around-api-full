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
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => this._getResponseData(res));
  }

  //GET Get user info
  getUserInfo(token) {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        ...this._headers,
        "Authorization": `Bearer ${token}`,
      },
    }).then((res) => this._getResponseData(res));
  }

  //PATCH Set user info
  setUserInfo({ name, about, token }) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ name, about }),
    }).then((res) => this._getResponseData(res));
  }

  //PATCH Set user avatar
  setUserAvatar({ avatar }) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    }).then((res) => this._getResponseData(res));
  }

  //POST Add new place
  addCard({ name, link }) {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify({ name, link }),
    }).then((res) => this._getResponseData(res));
  }

  //DELETE Remove place
  removeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      headers: this.headers,
      method: "DELETE",
    }).then((res) => this._getResponseData(res));
  }

  //PUT/DELETE Change Like status
  changeLikeCardStatus(cardId, method) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      headers: this.headers,
      method: method,
    }).then((res) => this._getResponseData(res));
  }

  //Get initial data
  getAppInfo(token) {
    return Promise.all([this.getInitialCards(token), this.getUserInfo(token)]);
  }
}

const api = new Api({
  //baseUrl: "https://around.nomoreparties.co/v1/group-1",
  baseUrl: "http://localhost:3000",
  headers: {
    //Authorization: "02dcf3f3-4313-4731-b00a-f80d0e88b6bf",
    "Content-Type": "application/json",
  },
});

export default api;
// ///
// fetch(`http://localhost:3000/users/me`, {
//   method: "PATCH",
//   headers: {
//     "Content-Type": "application/json",
//     "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDM3Yjc1OGJkNTU0YjI0M2IwM2EyODMiLCJpYXQiOjE2MTQyOTQxOTEsImV4cCI6MTYxNDg5ODk5MX0.o7d6YUbB6hhcY-UR_PWDALjSJqFbEZSDW4XlboXovTs`,
//   },
//   body: JSON.stringify({ "Andy Sam", "Act" }),
// }
