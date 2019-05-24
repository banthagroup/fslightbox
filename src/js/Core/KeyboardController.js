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
                if (self.data.totalSlides > 1)
                    self.appendMethods.previousSlideViaButton(self.data.slide);
                break;
            case RIGHT_ARROW:
                if (self.data.totalSlides > 1)
                    self.appendMethods.nextSlideViaButton(self.data.slide);
                break;
        }
    }
};
