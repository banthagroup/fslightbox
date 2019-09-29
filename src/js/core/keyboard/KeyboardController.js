export function KeyboardController(
    {
        componentsServices,
        core: { lightboxCloser, fullscreenToggler, slideChangeFacade }
    }
) {
    this.listener = (e) => {
        switch (e.keyCode) {
            case 27:
                lightboxCloser.closeLightbox();
                break;
            case 37:
                slideChangeFacade.changeToPrevious();
                break;
            case 39:
                slideChangeFacade.changeToNext();
                break;
            case 122:
                e.preventDefault();
                componentsServices.enterFullscreen();
                fullscreenToggler.enterFullscreen();
                break;
        }
    };
}
