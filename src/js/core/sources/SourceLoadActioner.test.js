import { SourceLoadActioner } from "./SourceLoadActioner";
import { SourceStyler } from "./SourceStyler";
import { FADE_IN_STRONG_CLASS_NAME, OPACITY_1_CLASS_NAME } from "../../constants/classes-names";

const fsLightbox = {
    collections: { sourcesStylers: [] },
    componentsStates: { isSourceLoadedCollection: [{ set: jest.fn() }] },
    elements: {
        sources: [{ current: { classList: { add: jest.fn() } } }],
        sourcesInners: [{ current: { classList: { add: jest.fn(), remove: jest.fn() } } }]
    },
    resolve: (constructorDependency, params) => {
        if (constructorDependency === SourceStyler) {
            expect(params).toEqual([0, 1000, 1500]);
            return sourceStyler;
        } else {
            throw new Error('Invalid dependency')
        }
    }
};
const sourceStyler = { styleSize: jest.fn() };
const sourceLoadActioner = new SourceLoadActioner(fsLightbox, 0, 1000, 1500);

test('runNormalLoadActions', () => {
    sourceLoadActioner.runNormalLoadActions();
    expect(fsLightbox.elements.sources[0].current.classList.add).toBeCalledWith(OPACITY_1_CLASS_NAME);
    expect(fsLightbox.elements.sourcesInners[0].current.classList.add).toBeCalledWith(FADE_IN_STRONG_CLASS_NAME);
    expect(fsLightbox.componentsStates.isSourceLoadedCollection[0].set).toBeCalledWith(true);
});

test('runInitialLoadActions', () => {
    sourceLoadActioner.runNormalLoadActions = jest.fn();
    sourceLoadActioner.runInitialLoadActions();
    expect(sourceLoadActioner.runNormalLoadActions).toBeCalled();
    expect(sourceStyler.styleSize).toBeCalled();
    expect(fsLightbox.collections.sourcesStylers[0]).toBe(sourceStyler);
});
