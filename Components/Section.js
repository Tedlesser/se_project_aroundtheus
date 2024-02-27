class Section {
    constructor ({renderer}, containerSelector) {
    this._renderer = renderer, 
    this._container = document.querySelector(`.${containerSelector}`);
    }

    renderItems(items){
        // It should iterate through the items array and call the renderer() function on each item. This method should be called once on page load.
        items.forEach(item => {
           this._renderer(item);
        });
    }

    addItem (element) {
        // takes a DOM element and adds it to the container. This method should be called when adding an individual card to the DOM.
        this._container.append(element);
    }
}
export default Section;