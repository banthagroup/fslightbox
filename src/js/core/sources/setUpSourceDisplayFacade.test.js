import { setUpSourceDisplayFacade } from "./setUpSourceDisplayFacade";

const fsLightbox = {
    collections: {
        sourcesRenderFunctions: [
            () => wasFirstSourceRenderCalled = true,
            () => wasSecondSourceRenderCalled = true,
            undefined,
            () => wasFourthSourceRenderCalled = true
        ]
    },
    core: { sourceDisplayFacade: {} },
    props: { loadOnlyCurrentSource: true },
    stageIndexes: {
        previous: 0,
        current: 1,
        next: 2
    }
};
let wasFirstSourceRenderCalled = false;
let wasSecondSourceRenderCalled = false;
let wasFourthSourceRenderCalled = false;
const sourceDisplayFacade = fsLightbox.core.sourceDisplayFacade;
setUpSourceDisplayFacade(fsLightbox);

test('displaySourcesWhichShouldBeDisplayed', () => {
    sourceDisplayFacade.displaySourcesWhichShouldBeDisplayed();
    expect(wasFirstSourceRenderCalled).toBe(false);
    expect(wasSecondSourceRenderCalled).toBe(true);
    expect(wasFourthSourceRenderCalled).toBe(false);
    expect(fsLightbox.collections.sourcesRenderFunctions[0]).not.toBeUndefined();
    expect(fsLightbox.collections.sourcesRenderFunctions[1]).toBeUndefined();
    expect(fsLightbox.collections.sourcesRenderFunctions[3]).not.toBeUndefined();

    fsLightbox.props.loadOnlyCurrentSource = false;
    setUpSourceDisplayFacade(fsLightbox);
    sourceDisplayFacade.displaySourcesWhichShouldBeDisplayed();
    expect(wasFirstSourceRenderCalled).toBe(true);
    expect(wasSecondSourceRenderCalled).toBe(true);
    expect(wasFourthSourceRenderCalled).toBe(false);
    expect(fsLightbox.collections.sourcesRenderFunctions[0]).toBeUndefined();
    expect(fsLightbox.collections.sourcesRenderFunctions[1]).toBeUndefined();
    expect(fsLightbox.collections.sourcesRenderFunctions[3]).not.toBeUndefined();
});
