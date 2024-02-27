import Popup from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({popupSelector});
    console.log(this._popupElement); 
    this._imageElement = this._popupElement.querySelector('.modal__image');
    this._imageCaption = this._popupElement.querySelector(".image__caption");
    }

    // data should be an object containing the name and link    
    open({name, link}) {
    // set the caption's textContent
    this._imageCaption.textContent = name;
    this._imageElement.src = link;
    this._imageElement.alt = name;
    // replace alt with card title
    super.open();
    }
  }
export default PopupWithImage
