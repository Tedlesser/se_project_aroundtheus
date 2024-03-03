import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
  }

  // data should be an object containing the name and link
  open({ name, link }) {
    // set the caption's textContent
    const cardImageEl = this._popupElement.querySelector(".modal__image");
    const cardCaption = this._popupElement.querySelector(".image__caption");
    cardImageEl.src = link;
    cardImageEl.alt = link;
    cardCaption.textContent = name;
    console.log(link);
    // replace alt with card title
    super.open();
  }
}
