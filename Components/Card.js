
export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._cardEl = null; // Initialize _cardEl to null
  }

  _setEventListeners() {
    this._cardEl.querySelector(".card__image").addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });

    this._cardEl
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    this._cardEl
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });
  }

  _handleLikeIcon() {
    // Remove semicolon here
    this._cardEl
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active"); // Remove dot before class name
  }

  _handleDeleteCard() {
    // Remove semicolon here
    this._cardEl.remove();
    this._cardEl = null;
  }

  getView() {
    this._cardEl = document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true);
    // Assuming you have some code here to create the card element
    this._cardImageEl = this._cardEl.querySelector(".card__image");
    this._cardTitleEl = this._cardEl.querySelector(".card__title");
    // You need to add implementation here to create and configure the card element
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._link;
    this._cardTitleEl.textContent = this._name;
    // For example:
    // Set event listeners

    this._setEventListeners();
    return this._cardEl; // Return this._cardEl instead of cardEl
  }
}

