import { SlideSwipingUpActionerBucket } from "./SlideSwipingUpActionerBucket";
import { TRANSFORM_TRANSITION_CLASS_NAME } from "../../../../constants/classes-names";

const fsLightbox = {
    collections: { sourceMainWrappersTransformers: [] },
    core: { slideIndexChanger: {} },
    elements: { sourceMainWrappers: [] },
    slideSwipingProps: { upSwipedX: 1000, upSwipedY: 2000, swipedX: 100, swipedY: 200 },
    stageIndexes: {}
};

const slideSwipingUpActionsBucket = new SlideSwipingUpActionerBucket(fsLightbox);

beforeEach(() => {
    fsLightbox.stageIndexes.previous = undefined;
    fsLightbox.stageIndexes.current = 1;
    fsLightbox.stageIndexes.next = undefined;
    fsLightbox.core.slideIndexChanger.changeTo = jest.fn((newIndex) => fsLightbox.stageIndexes.current = newIndex);
    fsLightbox.collections.sourceMainWrappersTransformers[0] = { zero: jest.fn() };
    fsLightbox.collections.sourceMainWrappersTransformers[1] = {
        negative: jest.fn(),
        zero: jest.fn(),
        positive: jest.fn()
    };
    fsLightbox.collections.sourceMainWrappersTransformers[2] = { zero: jest.fn() };
    fsLightbox.elements.sourceMainWrappers[0] =  { classList: { add: jest.fn() } } ;
    fsLightbox.elements.sourceMainWrappers[1] =  { classList: { add: jest.fn() } } ;
    fsLightbox.elements.sourceMainWrappers[2] =  { classList: { add: jest.fn() } } ;
});

test('runPositiveSwipedXActions', () => {
    slideSwipingUpActionsBucket.runPositiveSwipedXActions();
    expect(fsLightbox.core.slideIndexChanger.changeTo).not.toBeCalled();
    expect(fsLightbox.elements.sourceMainWrappers[0].classList.add).not.toBeCalled();
    expect(fsLightbox.elements.sourceMainWrappers[1].classList.add).toBeCalledWith(TRANSFORM_TRANSITION_CLASS_NAME);
    expect(fsLightbox.collections.sourceMainWrappersTransformers[0].zero).not.toBeCalled();
    expect(fsLightbox.collections.sourceMainWrappersTransformers[1].zero).toBeCalled();

    fsLightbox.stageIndexes.previous = 0;
    slideSwipingUpActionsBucket.runPositiveSwipedXActions();
    expect(fsLightbox.core.slideIndexChanger.changeTo).toBeCalledWith(0);
    expect(fsLightbox.elements.sourceMainWrappers[0].classList.add).toBeCalledWith(TRANSFORM_TRANSITION_CLASS_NAME);
    expect(fsLightbox.elements.sourceMainWrappers[1].classList.add)
        .toHaveBeenNthCalledWith(2, TRANSFORM_TRANSITION_CLASS_NAME);
    expect(fsLightbox.collections.sourceMainWrappersTransformers[0].zero).toBeCalled();
    expect(fsLightbox.collections.sourceMainWrappersTransformers[1].positive).toBeCalled();
    expect(fsLightbox.collections.sourceMainWrappersTransformers[1].zero).toBeCalledTimes(1);
});

test('runNegativeSwipedXActions', () => {
    slideSwipingUpActionsBucket.runNegativeSwipedXActions();
    expect(fsLightbox.core.slideIndexChanger.changeTo).not.toBeCalled();
    expect(fsLightbox.elements.sourceMainWrappers[1].classList.add).toBeCalledWith(TRANSFORM_TRANSITION_CLASS_NAME);
    expect(fsLightbox.elements.sourceMainWrappers[2].classList.add).not.toBeCalled();
    expect(fsLightbox.collections.sourceMainWrappersTransformers[1].zero).toBeCalled();
    expect(fsLightbox.collections.sourceMainWrappersTransformers[2].zero).not.toBeCalled();

    fsLightbox.stageIndexes.next = 2;
    slideSwipingUpActionsBucket.runNegativeSwipedXActions();
    expect(fsLightbox.core.slideIndexChanger.changeTo).toBeCalledWith(2);
    expect(fsLightbox.elements.sourceMainWrappers[1].classList.add)
        .toHaveBeenNthCalledWith(2, TRANSFORM_TRANSITION_CLASS_NAME);
    expect(fsLightbox.elements.sourceMainWrappers[2].classList.add).toBeCalledWith(TRANSFORM_TRANSITION_CLASS_NAME);
    expect(fsLightbox.collections.sourceMainWrappersTransformers[1].negative).toBeCalled();
    expect(fsLightbox.collections.sourceMainWrappersTransformers[1].zero).toBeCalledTimes(1);
    expect(fsLightbox.collections.sourceMainWrappersTransformers[2].zero).toBeCalled();
});
