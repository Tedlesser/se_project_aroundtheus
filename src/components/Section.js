export default class Section {
    constructor({items, renderer}, cardContainer){
    this._items = items
    this._renderer = renderer
    this.cardContainer = document.querySelector(cardContainer)
}

renderItems (){
    this._items.forEach((item) => {
       this._renderer(item);
    })
}

addItem (element) {
    this.cardContainer.prepend(element)
}
}