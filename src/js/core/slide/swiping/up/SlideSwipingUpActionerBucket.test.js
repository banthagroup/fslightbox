import { SlideSwipingUpActionerBucket } from "./SlideSwipingUpActionerBucket";
import { TRANSFORM_TRANSITION_CLASS_NAME } from "../../../../constants/classes-names";

const fsLightbox = {
    collections: { sourcesOutersTransformers: [] },
    core: { slideIndexChanger: {} },
    elements: { sourcesOuters: [] },
    slideSwipingProps: { upSwipedX: 1000, upSwipedY: 2000, swipedX: 100, swipedY: 200 },
    stageIndexes: {}
};

const slideSwipingUpActionsBucket = new SlideSwipingUpActionerBucket(fsLightbox);

beforeEach(() => {
    fsLightbox.stageIndexes.previous = undefined;
    fsLightbox.stageIndexes.current = 1;
    fsLightbox.stageIndexes.next = undefined;
    fsLightbox.core.slideIndexChanger.changeTo = jest.fn((newIndex) => fsLightbox.stageIndexes.current = newIndex);
    fsLightbox.collections.sourcesOutersTransformers[0] = { zero: jest.fn() };
    fsLightbox.collections.sourcesOutersTransformers[1] = {
        negative: jest.fn(),
        zero: jest.fn(),
        positive: jest.fn()
    };
    fsLightbox.collections.sourcesOutersTransformers[2] = { zero: jest.fn() };
    fsLightbox.elements.sourcesOuters[0] = { current: { classList: { add: jest.fn() } } };
    fsLightbox.elements.sourcesOuters[1] = { current: { classList: { add: jest.fn() } } };
    fsLightbox.elements.sourcesOuters[2] = { current: { classList: { add: jest.fn() } } };
});

test('runPositiveSwipedXActions', () => {
    slideSwipingUpActionsBucket.runPositiveSwipedXActions();
    expect(fsLightbox.core.slideIndexChanger.changeTo).not.toBeCalled();
    expect(fsLightbox.elements.sourcesOuters[0].current.classList.add).not.toBeCalled();
    expect(fsLightbox.elements.sourcesOuters[1].current.classList.add).toBeCalledWith(TRANSFORM_TRANSITION_CLASS_NAME);
    expect(fsLightbox.collections.sourcesOutersTransformers[0].zero).not.toBeCalled();
    expect(fsLightbox.collections.sourcesOutersTransformers[1].zero).toBeCalled();

    fsLightbox.stageIndexes.previous = 0;
    slideSwipingUpActionsBucket.runPositiveSwipedXActions();
    expect(fsLightbox.core.slideIndexChanger.changeTo).toBeCalledWith(0);
    expect(fsLightbox.elements.sourcesOuters[0].current.classList.add).toBeCalledWith(TRANSFORM_TRANSITION_CLASS_NAME);
    expect(fsLightbox.elements.sourcesOuters[1].current.classList.add)
        .toHaveBeenNthCalledWith(2, TRANSFORM_TRANSITION_CLASS_NAME);
    expect(fsLightbox.collections.sourcesOutersTransformers[0].zero).toBeCalled();
    expect(fsLightbox.collections.sourcesOutersTransformers[1].positive).toBeCalled();
    expect(fsLightbox.collections.sourcesOutersTransformers[1].zero).toBeCalledTimes(1);
});

test('runNegativeSwipedXActions', () => {
    slideSwipingUpActionsBucket.runNegativeSwipedXActions();
    expect(fsLightbox.core.slideIndexChanger.changeTo).not.toBeCalled();
    expect(fsLightbox.elements.sourcesOuters[1].current.classList.add).toBeCalledWith(TRANSFORM_TRANSITION_CLASS_NAME);
    expect(fsLightbox.elements.sourcesOuters[2].current.classList.add).not.toBeCalled();
    expect(fsLightbox.collections.sourcesOutersTransformers[1].zero).toBeCalled();
    expect(fsLightbox.collections.sourcesOutersTransformers[2].zero).not.toBeCalled();

    fsLightbox.stageIndexes.next = 2;
    slideSwipingUpActionsBucket.runNegativeSwipedXActions();
    expect(fsLightbox.core.slideIndexChanger.changeTo).toBeCalledWith(2);
    expect(fsLightbox.elements.sourcesOuters[1].current.classList.add)
        .toHaveBeenNthCalledWith(2, TRANSFORM_TRANSITION_CLASS_NAME);
    expect(fsLightbox.elements.sourcesOuters[2].current.classList.add).toBeCalledWith(TRANSFORM_TRANSITION_CLASS_NAME);
    expect(fsLightbox.collections.sourcesOutersTransformers[1].negative).toBeCalled();
    expect(fsLightbox.collections.sourcesOutersTransformers[1].zero).toBeCalledTimes(1);
    expect(fsLightbox.collections.sourcesOutersTransformers[2].zero).toBeCalled();
});
