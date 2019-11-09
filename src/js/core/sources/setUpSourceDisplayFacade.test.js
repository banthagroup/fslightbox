import { setUpSourceDisplayFacade } from "./setUpSourceDisplayFacade";

const fsLightbox = {
    collections: {
        sourcesRenderFunctions: [
            null,
            () => wasFirstSourceRenderCalled = true,
            null,
            () => wasThirdSourceRenderCalled = true,
            jest.fn()
        ]
    },
    core: { sourceDisplayFacade: {} },
    stageIndexes: {
        previous: 1,
        current: 2,
        next: 3
    }
};
let wasFirstSourceRenderCalled;
let wasThirdSourceRenderCalled;
const sourceDisplayFacade = fsLightbox.core.sourceDisplayFacade;
setUpSourceDisplayFacade(fsLightbox);

test('displayStageSourcesIfNotYet', () => {
    sourceDisplayFacade.displayStageSourcesIfNotYet();
    expect(wasFirstSourceRenderCalled).toBe(true);
    expect(wasThirdSourceRenderCalled).toBe(true);
    expect(fsLightbox.collections.sourcesRenderFunctions[1]).toBeUndefined();
    expect(fsLightbox.collections.sourcesRenderFunctions[3]).toBeUndefined();
    expect(fsLightbox.collections.sourcesRenderFunctions[4]).not.toBeCalled();
});
