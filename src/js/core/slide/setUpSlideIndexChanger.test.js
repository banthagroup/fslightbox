import { setUpSlideIndexChanger } from "./setUpSlideIndexChanger";
import { ANIMATION_TIME } from "../../constants/css-constants";
import { SOURCES_INNERS, SOURCES_OUTERS } from "../../constants/elements";
import {
    FADE_IN_CLASS_NAME,
    FADE_IN_STRONG_CLASS_NAME,
    FADE_OUT_CLASS_NAME,
    TRANSFORM_TRANSITION_CLASS_NAME
} from "../../constants/classes-names";
import * as removeFromElementClassIfContainsObject from "../../helpers/elements/removeFromElementClassIfContains";
import * as getQueuedActionObject from "../timeouts/getQueuedAction";

const fsLightbox = {
    collections: {
        sourcesOutersTransformers: [{ negative: jest.fn() }, { zero: jest.fn() }],
    },
    core: {
        classFacade: { removeFromEachElementClassIfContains: jest.fn() },
        slideIndexChanger: {},
        sourceDisplayFacade: { displayStageSourcesIfNotYet: jest.fn() },
        stageManager: {
            updateStageIndexes: jest.fn(),
            isSourceInStage: jest.fn((i) => {
                return i === 0 || i === 2;
            })
        }
    },
    componentsServices: { setSlideNumber: jest.fn() },
    elements: {
        sourcesInners: [
            { classList: { add: jest.fn() } },
            { classList: { add: jest.fn() } }
        ]
    },
    stageIndexes: {}
};

const runQueuedRemoveFadeOut = jest.fn();
getQueuedActionObject.getQueuedAction = jest.fn(() => runQueuedRemoveFadeOut);
const slideIndexChanger = fsLightbox.core.slideIndexChanger;
setUpSlideIndexChanger(fsLightbox);

test('removeFadeOutQueue', () => {
    expect(getQueuedActionObject.getQueuedAction.mock.calls[0][1]).toBe(ANIMATION_TIME);
    getQueuedActionObject.getQueuedAction.mock.calls[0][0]();
    expect(fsLightbox.core.classFacade.removeFromEachElementClassIfContains).toBeCalledWith(
        SOURCES_INNERS, FADE_OUT_CLASS_NAME
    );
});

test('changeTo', () => {
    slideIndexChanger.changeTo(1);
    expect(fsLightbox.stageIndexes.current).toBe(1);
    expect(fsLightbox.core.stageManager.updateStageIndexes).toBeCalled();
    expect(fsLightbox.componentsServices.setSlideNumber).toBeCalledWith(2);
    expect(fsLightbox.core.sourceDisplayFacade.displayStageSourcesIfNotYet).toBeCalled();
});

test('jumpTo', () => {
    window.setTimeout = jest.fn();
    fsLightbox.stageIndexes.current = 0;
    removeFromElementClassIfContainsObject.removeFromElementClassIfContains = jest.fn();
    slideIndexChanger.changeTo = jest.fn();
    slideIndexChanger.jumpTo(1);
    expect(slideIndexChanger.changeTo).toBeCalledWith(1);
    expect(fsLightbox.core.classFacade.removeFromEachElementClassIfContains).toBeCalledWith(
        SOURCES_OUTERS, TRANSFORM_TRANSITION_CLASS_NAME
    );
    expect(removeFromElementClassIfContainsObject.removeFromElementClassIfContains).toBeCalledWith(
        fsLightbox.elements.sourcesInners[0], FADE_IN_STRONG_CLASS_NAME
    );
    expect(removeFromElementClassIfContainsObject.removeFromElementClassIfContains).toBeCalledWith(
        fsLightbox.elements.sourcesInners[0], FADE_IN_CLASS_NAME
    );

    expect(fsLightbox.elements.sourcesInners[0].classList.add).toBeCalledWith(FADE_OUT_CLASS_NAME);
    expect(removeFromElementClassIfContainsObject.removeFromElementClassIfContains).toBeCalledWith(
        fsLightbox.elements.sourcesInners[1], FADE_IN_STRONG_CLASS_NAME
    );
    expect(removeFromElementClassIfContainsObject.removeFromElementClassIfContains).toBeCalledWith(
        fsLightbox.elements.sourcesInners[1], FADE_OUT_CLASS_NAME
    );
    expect(fsLightbox.elements.sourcesInners[1].classList.add).toBeCalledWith(FADE_IN_CLASS_NAME);
    expect(fsLightbox.collections.sourcesOutersTransformers[1].zero).toBeCalled();
    expect(runQueuedRemoveFadeOut).toBeCalled()
    expect(fsLightbox.collections.sourcesOutersTransformers[0].negative).not.toBeCalled();
    expect(window.setTimeout.mock.calls[0][1]).toBe(ANIMATION_TIME - 30);
    window.setTimeout.mock.calls[0][0]();
    expect(fsLightbox.collections.sourcesOutersTransformers[0].negative).not.toBeCalled();
    fsLightbox.stageIndexes.current = 1;
    window.setTimeout.mock.calls[0][0]();
    expect(fsLightbox.collections.sourcesOutersTransformers[0].negative).toBeCalled();
});
