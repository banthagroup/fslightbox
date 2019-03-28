module.exports = function (tag) {
    this.elem = document.createElement(tag);

    this.addClassesAndCreate = function (classes) {
        for (let index in classes) {
            this.elem.classList.add(classes[index]);
        }
        return this.elem
    }
};