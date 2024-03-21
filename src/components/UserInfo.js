export default class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
    this._profileImage= document.querySelector(avatarSelector)
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._description.textContent,
    };
  }

  setUserInfo({ title , description }) {
    this._name.textContent = title;
    this._description.textContent = description;
  }

  setUserAvatar({ avatar }) {
    this._avatar.src = avatar;
  }
}
