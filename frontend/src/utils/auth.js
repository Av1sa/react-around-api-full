class Auth {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _getResponseData(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  //Register user
  registerUser(data) {
    return fetch(`${this.baseUrl}/signup`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data),
    }).then(this._getResponseData);
  }

  //Sign in user
  signInUser(data) {
    return fetch(`${this.baseUrl}/signin`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data),
    }).then(this._getResponseData);
  }

  //Check token and get user email
  validateUser(token) {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._getResponseData);
  }
}

const auth = new Auth({
  baseUrl: "https://api.mm15.students.nomoreparties.site",
  headers: {
    "Content-Type": "application/json",
  },
});

export default auth;
