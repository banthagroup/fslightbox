module.exports = function (self) {
    const ESCAPE = 'Escape';
    const LEFT_ARROW = 'ArrowLeft';
    const RIGHT_ARROW = 'ArrowRight';

    this.handleKeyDown = function (event) {
        switch (event.code) {
            case ESCAPE:
                self.hide();
                break;
            case LEFT_ARROW:
                const previousIndex = self.stageSourceIndexes.previous(self.data.slide) + 1;
                self.setSlide(previousIndex);
                break;
            case RIGHT_ARROW:
                const nextIndex = self.stageSourceIndexes.next(self.data.slide) + 1;
                self.setSlide(nextIndex);
                break;
        }
    }
};