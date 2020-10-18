import { SourceLoadActioner } from "./SourceLoadActioner";
import { SourceSizer } from "./SourceSizer";
import { FADE_IN_STRONG_CLASS_NAME, OPACITY_1_CLASS_NAME } from "../../constants/classes-names";

const fsLightbox = {
    collections: { sourcesStylers: [] },
    elements: {
        sources: [{ classList: { add: jest.fn() } }],
        sourceAnimationWrappers: [{ classList: { add: jest.fn(), remove: jest.fn() } }],
        sourceMainWrappers: [{ removeChild: jest.fn(), firstChild: 'loader' }]
    },
    resolve: (constructorDependency, params) => {
        if (constructorDependency === SourceSizer) {
            expect(params).toEqual([0, 1000, 1500]);
            return sourceStyler;
        } else {
            throw new Error('Invalid dependency')
        }
    }
};
const sourceStyler = { adjustSize: jest.fn() };
const sourceLoadActioner = new SourceLoadActioner(fsLightbox, 0, 1000, 1500);

test('runNormalLoadActions', () => {
    sourceLoadActioner.runNormalLoadActions();
    expect(fsLightbox.elements.sources[0].classList.add).toBeCalledWith(OPACITY_1_CLASS_NAME);
    expect(fsLightbox.elements.sourceAnimationWrappers[0].classList.add).toBeCalledWith(FADE_IN_STRONG_CLASS_NAME);
    expect(fsLightbox.elements.sourceMainWrappers[0].removeChild).toBeCalledWith('loader');
});

test('runInitialLoadActions', () => {
    sourceLoadActioner.runNormalLoadActions = jest.fn();
    sourceLoadActioner.runInitialLoadActions();
    expect(sourceLoadActioner.runNormalLoadActions).toBeCalled();
    expect(sourceStyler.adjustSize).toBeCalled();
    expect(fsLightbox.collections.sourcesStylers[0]).toBe(sourceStyler);
});
