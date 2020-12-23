import { SourceLoadActioner } from "./SourceLoadActioner";
import { FADE_IN_STRONG_CLASS_NAME, OPACITY_1_CLASS_NAME } from "../../constants/classes-names";

const fsLightbox = {
    collections: {
        sourceSizers: []
    },
    elements: {
        sourceAnimationWrappers: [null, { classList: { add: jest.fn() } }],
        sourceMainWrappers: [null, { firstChild: 'test-loader', removeChild: jest.fn() }],
        sources: [null, { classList: { add: jest.fn() } }]
    },
    resolve: (constructor, params) => {
        expect(params).toEqual(expectedSourceSizerParameters);
        return sourceSizer;
    }
};
let expectedSourceSizerParameters = [1, 100, 200];
const sourceSizer = { adjustSize: jest.fn() };

const sourceLoadActioner = new SourceLoadActioner(fsLightbox, 1);

test('runActions', () => {
    sourceLoadActioner.runActions(100, 200);
    expect(fsLightbox.elements.sources[1].classList.add).toBeCalledWith(OPACITY_1_CLASS_NAME);
    expect(fsLightbox.elements.sourceAnimationWrappers[1].classList.add).toBeCalledWith(FADE_IN_STRONG_CLASS_NAME);
    expect(fsLightbox.elements.sourceMainWrappers[1].removeChild).toBeCalledWith('test-loader');
    expect(fsLightbox.collections.sourceSizers[1]).toEqual(sourceSizer);
    expect(sourceSizer.adjustSize).toBeCalled();

    expectedSourceSizerParameters = [1, 300, 400];
    sourceLoadActioner.runActions(300, 400);
    expect(fsLightbox.elements.sources[1].classList.add).toBeCalledTimes(1);
    expect(fsLightbox.elements.sourceAnimationWrappers[1].classList.add).toBeCalledTimes(1);
    expect(fsLightbox.elements.sourceMainWrappers[1].removeChild).toBeCalledTimes(1);
    expect(sourceSizer.adjustSize).toBeCalledTimes(2);
});