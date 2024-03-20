import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
  }

  // set event listeners
  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }

  // set submit callback
  setSubmitCallback(event) {
    // set submit handler
    this._handleSubmit = event;
  }
}
