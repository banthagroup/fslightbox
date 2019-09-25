export function LightboxUpdateActioner(
    {
        core: {
            lightboxCloser,
            lightboxOpener,
            slideIndexChanger
        },
        getState,
        stageIndexes
    }
) {
    this.runTogglerUpdateActions = () => {
        (getState().isOpen) ?
            lightboxCloser.closeLightbox() :
            lightboxOpener.openLightbox();
    };

    this.runCurrentStageIndexUpdateActionsFor = (newSlideSourceIndex) => {
        if (newSlideSourceIndex === stageIndexes.current) {
            return;
        }

        (getState().isOpen) ?
            slideIndexChanger.jumpTo(newSlideSourceIndex) :
            stageIndexes.current = newSlideSourceIndex;
    };
}
