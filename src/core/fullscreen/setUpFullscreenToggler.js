export function setUpFullscreenToggler({ componentsServices, core: { fullscreenToggler: self } }) {
    self.enterFullscreen = () => {
        componentsServices.enterFullscreen();

        const documentElement = document.documentElement;
        if (documentElement.requestFullscreen) {
            documentElement.requestFullscreen();
        } else if (documentElement.mozRequestFullScreen) {
            documentElement.mozRequestFullScreen();
        } else if (documentElement.webkitRequestFullscreen) {
            documentElement.webkitRequestFullscreen();
        } else if (documentElement.msRequestFullscreen) {
            documentElement.msRequestFullscreen();
        }
    };

    self.exitFullscreen = () => {
        componentsServices.exitFullscreen();

        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}
