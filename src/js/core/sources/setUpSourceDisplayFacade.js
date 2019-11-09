export function setUpSourceDisplayFacade(
    {
        collections: { sourcesRenderFunctions },
        core: { sourceDisplayFacade: self },
        stageIndexes
    }
) {
    self.displayStageSourcesIfNotYet = () => {
        for (let i in stageIndexes) {
            if (sourcesRenderFunctions[stageIndexes[i]]) {
                sourcesRenderFunctions[stageIndexes[i]]();
                delete sourcesRenderFunctions[stageIndexes[i]];
            }
        }
    };
}
