import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popupElement.querySelectorAll(".modal__input");
  }

  _getInputValues(){
    const inputValue = {};
    this._inputList.forEach((input) => {
        inputValue[input.name] = input.value;
    });
    retcleaurn inputValue;
  }
    
  setEventListeners(){
    super.setEventListeners(); 
    this._popupForm.addEventListener("submit", (event) =>{
        event.preventDefault();

        const values = this._getInputValues();
        this._handleFormSubmit(values);
        console.log(values);
    });
  }
  reset(){
    this._popupForm.reset();
  }
}
export default PopupWithForm