export function setUpScrollbarRecompensor(
    {
        data,
        core: {
            scrollbarRecompensor: self
        }
    }
) {
    self.addRecompense = () => {
        (document.readyState === "complete") ?
            ifBodyIsHigherThanWindowAddRecompenseToScrollbar() :
            addEventListener('load', () => {
                ifBodyIsHigherThanWindowAddRecompenseToScrollbar();
                self.addRecompense = ifBodyIsHigherThanWindowAddRecompenseToScrollbar;
            });
    };

    const ifBodyIsHigherThanWindowAddRecompenseToScrollbar = () => {
        if (document.body.offsetHeight > innerHeight) {
            document.body.style.marginRight = data.scrollbarWidth + 'px';
        }
    };

    self.removeRecompense = () => {
        document.body.style.removeProperty('margin-right');
    };
}
