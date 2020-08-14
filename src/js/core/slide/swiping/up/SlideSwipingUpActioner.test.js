import { SlideSwipingUpActionerBucket } from "./SlideSwipingUpActionerBucket";
import { SlideSwipingUpActioner } from "./SlideSwipingUpActioner";
import { CURSOR_GRABBING_CLASS_NAME } from "../../../../constants/classes-names";
import * as removeFromElementChildIfContainsObject from '../../../../helpers/elements/removeFromElementChildIfContains';

const fsLightbox = {
    core: {
        lightboxCloser: { closeLightbox: jest.fn() },
        swipingActioner: { runTopActionsForProps: jest.fn() }
    },
    elements: {
        container: { classList: { remove: jest.fn() } },
        slideSwipingHoverer: 'slide-swiping-hoverer'
    },
    resolve: (constructorDependency) => {
        if (constructorDependency === SlideSwipingUpActionerBucket) {
            return slideSwipingUpActionsBucket;
        } else {
            throw new Error('Invalid dependency');
        }
    },
    slideSwipingProps: { isSourceDownEventTarget: true, swipedX: 1 },
    stageIndexes: {}
};
const slideSwipingUpActionsBucket = {
    runPositiveSwipedXActions: jest.fn(),
    runNegativeSwipedXActions: jest.fn(),
    runZoomSwipeActions: jest.fn()
};
removeFromElementChildIfContainsObject.removeFromElementChildIfContains = jest.fn();
const slideSwipingUpActions = new SlideSwipingUpActioner(fsLightbox);

test('resetSwiping', () => {
    slideSwipingUpActions.runNoSwipeActions();
    expect(removeFromElementChildIfContainsObject.removeFromElementChildIfContains)
        .toBeCalledWith(fsLightbox.elements.container, 'slide-swiping-hoverer');
    expect(fsLightbox.core.lightboxCloser.closeLightbox).not.toBeCalled();
    expect(fsLightbox.slideSwipingProps.isSwiping).toBe(false);
    fsLightbox.slideSwipingProps.isSourceDownEventTarget = false;
    slideSwipingUpActions.runNoSwipeActions();
    expect(fsLightbox.core.lightboxCloser.closeLightbox).toBeCalled();
});

test('runActions', () => {
    slideSwipingUpActions.runActions();
    expect(slideSwipingUpActionsBucket.runPositiveSwipedXActions).toBeCalled();
    expect(slideSwipingUpActionsBucket.runNegativeSwipedXActions).not.toBeCalled();
    expect(removeFromElementChildIfContainsObject.removeFromElementChildIfContains)
        .toBeCalledWith(fsLightbox.elements.container, 'slide-swiping-hoverer');
    expect(fsLightbox.elements.container.classList.remove).toBeCalledWith(CURSOR_GRABBING_CLASS_NAME);
    expect(fsLightbox.slideSwipingProps.isSwiping).toBe(false);

    fsLightbox.slideSwipingProps.swipedX = -1;
    slideSwipingUpActions.runActions();
    expect(slideSwipingUpActionsBucket.runPositiveSwipedXActions).toBeCalledTimes(1);
    expect(slideSwipingUpActionsBucket.runNegativeSwipedXActions).toBeCalled();
});
