import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._formPopup = this._popupElement.querySelector(".modal__form");
    this._submitBtn = this._popupElement.querySelector(".modal__button");
  }

  // set event listeners
  setEventListeners() {
    super.setEventListeners();
    this._formPopup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
      this.close();
    });
  }

  // set submit callback
  setSubmitCallback(handleFormSubmit) {
    // set submit handler
    this._handleFormSubmit = handleFormSubmit;
  }
}
