export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closeBtn = this._popupElement.querySelector(".modal__close");
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
    document.removeEventListener("keydown",this._handleEscClose);
  }

  _handleEscClose(event) {
    console.log(event)
    if (event.key === "Escape") {
      this.close();
      }
    };

  setEventListeners() {
    this._popupElement.addEventListener("click", (event) => {
      if (event.target.classList.contains("modal_opened")) {
        this.close();
      }
    });

    this._closeBtn.addEventListener("click", () => {
      this.close();
    });
  }
}
