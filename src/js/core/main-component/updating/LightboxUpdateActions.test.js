import { LightboxUpdateActioner } from "./LightboxUpdateActioner";

const fsLightbox = {
    core: {
        lightboxCloser: {
            closeLightbox: () => {}
        },
        lightboxOpener: {
            openLightbox: () => {}
        },
        slideIndexChanger: {
            jumpTo: () => {}
        }
    },
    getState: () => lightboxState,
    stageIndexes: {
        current: undefined
    }
};

const lightboxState = {
    isOpen: undefined
};

const lightboxCloser = fsLightbox.core.lightboxCloser;
const lightboxOpener = fsLightbox.core.lightboxOpener;
const slideIndexChanger = fsLightbox.core.slideIndexChanger;

const lightboxUpdateActions = new LightboxUpdateActioner(fsLightbox);

describe('runTogglerUpdateActions', () => {
    beforeEach(() => {
        lightboxCloser.closeLightbox = jest.fn();
        lightboxOpener.openLightbox = jest.fn();
    });

    it('should open lightbox when isOpen state === false', () => {
        lightboxState.isOpen = false;
        lightboxUpdateActions.runTogglerUpdateActions();
        expect(lightboxCloser.closeLightbox).not.toBeCalled();
        expect(lightboxOpener.openLightbox).toBeCalled();
    });

    it('should close lightbox when isOpen state === true', () => {
        lightboxState.isOpen = true;
        lightboxUpdateActions.runTogglerUpdateActions();
        expect(lightboxCloser.closeLightbox).toBeCalled();
        expect(lightboxOpener.openLightbox).not.toBeCalled();
    });
});

describe('runCurrentStateIndexUpdateActionsFor', () => {
    beforeEach(() => {
        fsLightbox.stageIndexes.current = 0;
        slideIndexChanger.jumpTo = jest.fn();
    });

    test('lightbox is closed', () => {
        lightboxState.isOpen = false;

        lightboxUpdateActions.runCurrentStageIndexUpdateActionsFor(0);
        expect(slideIndexChanger.jumpTo).not.toBeCalled();

        lightboxUpdateActions.runCurrentStageIndexUpdateActionsFor(5);
        expect(fsLightbox.stageIndexes.current).toBe(5);
        expect(slideIndexChanger.jumpTo).not.toBeCalled();
    });

    test('lightbox is opened', () => {
        lightboxState.isOpen = true;

        lightboxUpdateActions.runCurrentStageIndexUpdateActionsFor(0);
        expect(slideIndexChanger.jumpTo).not.toBeCalled();

        lightboxUpdateActions.runCurrentStageIndexUpdateActionsFor(5);
        expect(fsLightbox.stageIndexes.current).toBe(0);
        expect(slideIndexChanger.jumpTo).toBeCalledWith(5);
    });
});
