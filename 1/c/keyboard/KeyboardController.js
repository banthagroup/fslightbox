export function KeyboardController(
	{
		core: {
			lightboxCloser,
			slideChangeFacade
		},
		fs
	}
) {
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
                fs.t();
        }
    };
}
