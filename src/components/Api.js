import Card from "./Card";

export default class Api {
  constructor({ baseUrl, headers }) {
    (this._baseUrl = baseUrl), (this._headers = headers);
  }

  _checkServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // if the server returns an error, reject the promise.
    return Promise.reject(`Error: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "GET",
    }).then(this._checkServerResponse);
  }

  createCards({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkServerResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkServerResponse);
  }

  deleteCards(cardId) {
    return fetch(`${baseUrl}/cards/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    }).then(this._checkServerResponse);
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
      body: JSON.stringify(card),
    }).then(this._checkServerResponse);
  }

  removelikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
      body: JSON.stringify(card),
    }).then(this._checkServerResponse);
  }

  updateProfileInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: "jack costeau",
        about: "adventurer",
      }),
    }).then(this._checkServerResponse);
  }

  updateProfileImage({ link }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        image: link,
      }),
    }).then(this._checkServerResponse);
  }

  loadPageContent() {
    return Promise.all([this.loadUserInfo(), this.getInitialCards()]);
  }
}
