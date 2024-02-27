import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({popupSelector});
    
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popupElement.querySelector(".modal__input");
  }

  _getInputValues(){

  };

  _setEventListeners(){
    super
  }

  close() {
    this._formModal.reset();
    super.close();
  }
}

export default PopupWithForm

// index.js


