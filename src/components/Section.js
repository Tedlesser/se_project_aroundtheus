export default class Section {
    constructor({items, renderer}, cardContainer){
    this._renderedItems = items
    this._renderer = renderer
    this.cardContainer = document.querySelector(cardContainer)
}

renderedItems (){
    this._renderedItems.forEach((item) => {
       this._renderer(item);
    })
}

addItem (element) {
    this.cardContainer.prepend(element)
}
}