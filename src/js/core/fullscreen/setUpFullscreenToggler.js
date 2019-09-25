export function setUpFullscreenToggler(
    {
        componentsStates: { toolbarButtons: { fullscreen: isFullscreenOpenState } },
        core: { fullscreenToggler: self }
    }
) {
    self.enterFullscreen = () => {
        isFullscreenOpenState.set(true);

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
        isFullscreenOpenState.set(false);

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
