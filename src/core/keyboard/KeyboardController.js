export function KeyboardController({ core: { lightboxCloser, fullscreenToggler, slideChangeFacade } }) {
    this.listener = (e) => {
        switch (e.key) {
            case 'Escape':
                lightboxCloser.closeLightbox();
                break;
            case 'ArrowLeft':
                slideChangeFacade.changeToPrevious();
                break;
            case 'ArrowRight':
                slideChangeFacade.changeToNext();
                break;
            case 'F11':
                e.preventDefault();
                // browsers does not trigger 'keydown' event when browser is already in fullscreen
                fullscreenToggler.enterFullscreen();
                break;
        }
    };
}
