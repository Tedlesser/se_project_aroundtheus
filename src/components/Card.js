export default class Card {
  constructor(
    { name, link },
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeButton,
    _id,
    isLiked,
    CardLike,
    RemoveCardLike
  ) {
    this._name = name;
    this._link = link;
    this._cardEl = null; // Initialize _cardEl to null
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeButton = handleLikeButton;
    this.id = _id;
    this._isLiked = isLiked;
    this._CardLike = CardLike;
    this._RemoveCardLike = RemoveCardLike;
  }

  getId() {
    return this.id;
  }

  _setEventListeners() {
    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });

    this._cardEl
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        if (this._isLiked) {
          this.RemoveCardLike(this);
        } else {
          this.CardLike(this);
        }
      });
    // this._cardEl
    //   .querySelector(".card__like-button")
    //   .addEventListener("click", () => {
    //     this._handleLikeIcon(),
    //     this._isLiked = !this._isLiked
    //   });

    this._cardEl
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeButton();
      });

    this._cardEl
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteClick(this);
      });
  }

  // _handleLikeIcon() {
  //   // Remove semicolon here
  //   this._cardEl
  //     .querySelector(".card__like-button")
  //     .classList.toggle("card__like-button_active"); // Remove dot before class name
  // }

  _handleLikeIcon(isLiked) {
    this.isLiked = isLiked;
    this.renderLikes();
  }

  renderLikes() {
    if (this.isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
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
    this._likeButton = this._cardEl.querySelector(".card__like-button");
    // You need to add implementation here to create and configure the card element
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._link;
    this._cardTitleEl.textContent = this._name;
    // For example:
    // Set event listeners

    this.renderLikes();
    this._setEventListeners();
    return this._cardEl; // Return this._cardEl instead of cardEl
  }
}
