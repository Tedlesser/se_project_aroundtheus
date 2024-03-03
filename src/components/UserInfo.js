export default class UserInfo {
  constructor({ name, description }) {
    this._name = name;
    this._description = description;
    this._title = document.querySelector(".profile__title");
    this._titleDescription = document.querySelector(".profile__description");
  }

  getUserInfo() {
    this._name = this._title.textContent;
    this._description = this._titleDescription.textContent;
    const userData = { name: this._name, description: this._description };
    return userData;
  }

  setUserInfo(userData) {
    this._name = data.name;
    this._description = data.description;
    const formData = { name: this._name, description: this._description };
    this._title.textContent = formData.name;
    this._subtitle.textContent = formData.description;
  }
}
