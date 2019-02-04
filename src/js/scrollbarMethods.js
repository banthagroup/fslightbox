module.exports = function (self) {

    const documentElementClassList = document.documentElement.classList;
    const scrollBarFixClassName = 'fslightbox-scrollbarfix';
    const scrollBarOpenClassName = 'fslightbox-open';


    const getRecompenseElements = function () {
          return document.querySelector('.recompense-for-scrollbarMethods');
    };

    this.hideScrollbar =  function () {
        if (documentElementClassList.contains(scrollBarFixClassName)) {
            const recompenseElements = getRecompenseElements();
            if (recompenseElements) {
                recompenseElements.style.paddingRight = '0';
            }
            documentElementClassList.remove(scrollBarFixClassName);
        }
        documentElementClassList.remove(scrollBarOpenClassName);
    };

    this.showScrollbar =  function () {
        if (!self.data.isMobile && document.documentElement.offsetHeight >= window.innerHeight) {
            const recompenseElements = getRecompenseElements();
            if (recompenseElements) {
                recompenseElements.style.paddingRight = '17px';
            }
            documentElementClassList.add(scrollBarFixClassName);
        }
        documentElementClassList.add(scrollBarOpenClassName);
    }
};