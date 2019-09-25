import { setUpFullscreenToggler } from "./setUpFullscreenToggler";

const fullscreenToggler = {};
const fsLightbox = {
    componentsStates: {
        toolbarButtons: {
            fullscreen: {
                set: jest.fn()
            }
        }
    },
    core: {
        fullscreenToggler: fullscreenToggler
    }
};

setUpFullscreenToggler(fsLightbox);

test('setting isFullscreenOpen component state', () => {
    fullscreenToggler.enterFullscreen();
    expect(fsLightbox.componentsStates.toolbarButtons.fullscreen.set).toBeCalledWith(true);
    fullscreenToggler.exitFullscreen();
    expect(fsLightbox.componentsStates.toolbarButtons.fullscreen.set).toBeCalledWith(false);
});

describe('requestFullscreen', () => {
    it('should turn on fullscreen', () => {
        document.documentElement.requestFullscreen = jest.fn();
        fullscreenToggler.enterFullscreen();
        expect(document.documentElement.requestFullscreen).toBeCalled();
    });

    it('should turn off fullscreen', () => {
        document.exitFullscreen = jest.fn();
        fullscreenToggler.exitFullscreen();
        expect(document.exitFullscreen).toBeCalled();
    });
});

describe('mozRequestFullScreen', () => {
    beforeEach(() => {
        document.documentElement.requestFullscreen = null;
        document.exitFullscreen = null;
    });

    it('should turn on fullscreen', () => {
        document.documentElement.mozRequestFullScreen = jest.fn();
        fullscreenToggler.enterFullscreen();
        expect(document.documentElement.mozRequestFullScreen).toBeCalled();
    });

    it('should turn off fullscreen', () => {
        document.mozCancelFullScreen = jest.fn();
        fullscreenToggler.exitFullscreen();
        expect(document.mozCancelFullScreen).toBeCalled();
    });
});

describe('webkitRequestFullscreen', () => {
    beforeEach(() => {
        document.documentElement.requestFullscreen = null;
        document.exitFullscreen = null;
        document.documentElement.mozRequestFullScreen = null;
        document.mozCancelFullScreen = null;
    });

    it('should turn on fullscreen', () => {
        document.documentElement.webkitRequestFullscreen = jest.fn();
        fullscreenToggler.enterFullscreen();
        expect(document.documentElement.webkitRequestFullscreen).toBeCalled();
    });

    it('should turn off fullscreen', () => {
        document.webkitExitFullscreen = jest.fn();
        fullscreenToggler.exitFullscreen();
        expect(document.webkitExitFullscreen).toBeCalled();
    });
});

describe('msRequestFullscreen', () => {
    beforeEach(() => {
        document.documentElement.requestFullscreen = null;
        document.exitFullscreen = null;
        document.documentElement.mozRequestFullScreen = null;
        document.mozCancelFullScreen = null;
        document.documentElement.webkitRequestFullscreen = null;
        document.webkitExitFullscreen = null;
    });

    it('should turn on fullscreen', () => {
        document.documentElement.msRequestFullscreen = jest.fn();
        fullscreenToggler.enterFullscreen();
        expect(document.documentElement.msRequestFullscreen).toBeCalled();
    });

    it('should turn off fullscreen', () => {
        document.msExitFullscreen = jest.fn();
        fullscreenToggler.exitFullscreen();
        expect(document.msExitFullscreen).toBeCalled();
    });
});
