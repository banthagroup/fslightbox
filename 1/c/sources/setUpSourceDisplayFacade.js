export function setUpSourceDisplayFacade(
    {
        collections: { sourcesRenderFunctions },
        core: { sourceDisplayFacade: self },
        loc,
        stageIndexes
    }
) {
    self.displaySourcesWhichShouldBeDisplayed = () => {
        if (loc) {
            runRenderActionsForSourceWithIndex(stageIndexes.current);
            return;
        }

        for (let i in stageIndexes) {
            runRenderActionsForSourceWithIndex(stageIndexes[i]);
        }
    };

    function runRenderActionsForSourceWithIndex(i) {
        if (sourcesRenderFunctions[i]) {
            sourcesRenderFunctions[i]();
            delete sourcesRenderFunctions[i];
        }
    }
}
