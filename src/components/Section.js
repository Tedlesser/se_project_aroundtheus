export default class Section {
  constructor({ renderer }, cardContainer) {
    this._renderer = renderer;
    this.cardContainer = document.querySelector(cardContainer);
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this.cardContainer.prepend(element);
  }
}
