export function setUpSlideChangeFacade(
    {
        core: {
            slideChangeFacade: self,
            slideIndexChanger,
            stageManager
        },
        props: { sources }
    }
) {
    if (sources.length > 1) {
        self.changeToPrevious = () => {
            slideIndexChanger.jumpTo(stageManager.getPreviousSlideIndex());
        };

        self.changeToNext = () => {
            slideIndexChanger.jumpTo(stageManager.getNextSlideIndex());
        };
    } else {
        self.changeToPrevious = () => {};
        self.changeToNext = () => {};
    }
}
