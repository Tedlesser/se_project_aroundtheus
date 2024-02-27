// function handleOutsideClick(event) {
//   if (event.target.classList.contains(".modal_opened")) {
//     closePopup(event.target);
//   }
// }

export default class Popup {
  constructor({ popupSelector }) {
    console.log(this._popupElement);
    this._popupElement = document.querySelector({ popupSelector });
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    // Open the popup logic...
    this._popupElement.classList.add("modal_opened");
    // Add click and esc. listener when the popup is opened
    this._popupElement.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    // Close the popup logic...
    this._popupElement.classList.remove("modal_opened");
    // Remove global click listener when the popup is closed
    this._popupElement.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      const openedModal = document.querySelector(".modal_opened");
      closePopup(openedModal);
    }
  }

  setEventListeners() {
    this._popupElement.removeEventListener("click", handleOutsideClick);
    this._popupElement.addEventListener("click", handleOutsideClick);
  }
}
