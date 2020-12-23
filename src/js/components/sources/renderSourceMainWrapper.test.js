import { renderSourceMainWrapper } from "./renderSourceMainWrapper";
import * as renderSourceAnimationWrapperObject from "./renderSourceAnimationWrapper";

const fsLightbox = {
    componentsServices: { hideSourceLoaderIfNotYetCollection: [] },
    elements: {
        sourceWrappersContainer: document.createElement('div'),
        sourceMainWrappers: []
    }
};
document.body.appendChild(fsLightbox.elements.sourceWrappersContainer);

let testSourceAnimationWrapper;
renderSourceAnimationWrapperObject.renderSourceAnimationWrapper = jest.fn(() => {
    testSourceAnimationWrapper = document.createElement('div');
    fsLightbox.elements.sourceMainWrappers[1].appendChild(testSourceAnimationWrapper);
});

test('hiding source loader', () => {
    renderSourceMainWrapper(fsLightbox, 1);
    expect(document.getElementsByClassName('fslightbox-loader')).toHaveLength(1);
    expect(fsLightbox.elements.sourceMainWrappers[1].contains(testSourceAnimationWrapper)).toBe(true);

    fsLightbox.componentsServices.hideSourceLoaderIfNotYetCollection[1]();
    expect(document.getElementsByClassName('fslightbox-loader')).toHaveLength(0);
    expect(fsLightbox.elements.sourceMainWrappers[1].contains(testSourceAnimationWrapper)).toBe(true);

    expect(fsLightbox.componentsServices.hideSourceLoaderIfNotYetCollection[1]).not.toThrowError();
    expect(fsLightbox.elements.sourceMainWrappers[1].contains(testSourceAnimationWrapper)).toBe(true);
});