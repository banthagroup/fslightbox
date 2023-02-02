export function setUpSourceDisplayFacade(
    {
        collections: { sourcesRenderFunctions },
        core: { sourceDisplayFacade: self },
        props,
        stageIndexes
    }
) {
    self.displaySourcesWhichShouldBeDisplayed = () => {
        if (props.loadOnlyCurrentSource) {
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
