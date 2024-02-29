export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector( popupSelector );
    console.log(this._popupElement);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    // Open the popup logic...
    this._popupElement.classList.add("modal_opened");
    // Add click and esc. listener when the popup is opened
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    // Close the popup logic...
    this._popupElement.classList.remove("modal_opened");
    // Remove global esc. click listener when the popup is closed
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener("click", (event) => {
      if (event.target.classList.contains("modal_opened")) {
        this.close();
      }
    });
  }
}
