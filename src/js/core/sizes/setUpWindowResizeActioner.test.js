import { setUpWindowResizeActioner } from "./setUpWindowResizeActioner";
import * as removeFromElementClassIfContainsObject from "../../helpers/elements/removeFromElementClassIfContains";
import { TRANSFORM_TRANSITION_CLASS_NAME } from "../../constants/classes-names";

const fsLightbox = {
    collections: {
        sourceMainWrappersTransformers: [{ negative: jest.fn() }, { negative: jest.fn() }],
        sourceSizers: [undefined, { adjustSize: jest.fn() }]
    },
    core: { windowResizeActioner: {} },
    componentsServices: { exitFullscreen: jest.fn() },
    data: { maxSourceWidth: null, maxSourceHeight: null },
    elements: { sourceMainWrappers: ['first-source-outer', 'second-source-outer'] },
    props: { sources: { length: 2 } },
    stageIndexes: { current: 0 }
};
innerWidth = 991;
innerHeight = 1000;
const windowResizeActioner = fsLightbox.core.windowResizeActioner;
setUpWindowResizeActioner(fsLightbox);
removeFromElementClassIfContainsObject.removeFromElementClassIfContains = jest.fn();

test('runActions', () => {
    windowResizeActioner.runActions();
    expect(fsLightbox.data.maxSourceWidth).toBe(991);
    expect(fsLightbox.data.maxSourceHeight).toBe(900);
    expect(fsLightbox.componentsServices.exitFullscreen).not.toBeCalled();
    expect(removeFromElementClassIfContainsObject.removeFromElementClassIfContains).toBeCalledWith(
        'first-source-outer', TRANSFORM_TRANSITION_CLASS_NAME
    );
    expect(removeFromElementClassIfContainsObject.removeFromElementClassIfContains).toBeCalledWith(
        'second-source-outer', TRANSFORM_TRANSITION_CLASS_NAME
    );
    expect(fsLightbox.collections.sourceMainWrappersTransformers[0].negative).not.toBeCalled();
    expect(fsLightbox.collections.sourceMainWrappersTransformers[1].negative).toBeCalled();
    expect(fsLightbox.collections.sourceSizers[1].adjustSize).toBeCalled();

    innerWidth = 992;
    windowResizeActioner.runActions();
    expect(fsLightbox.data.maxSourceWidth).toBe(0.9 * 992);
    expect(fsLightbox.data.maxSourceHeight).toBe(900);
});
