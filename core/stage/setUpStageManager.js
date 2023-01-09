export function setUpStageManager(
    {
        stageIndexes,
        core: { stageManager: self },
        props: { sources }
    }
) {
    const lastSourceIndex = sources.length - 1;

    self.getPreviousSlideIndex = () => {
        return (stageIndexes.current === 0) ?
            lastSourceIndex :
            stageIndexes.current - 1;
    };

    self.getNextSlideIndex = () => {
        return (stageIndexes.current === lastSourceIndex) ?
            0 :
            stageIndexes.current + 1;
    };

    // set up updateStageIndexes
    if (lastSourceIndex === 0) {
        self.updateStageIndexes = () => {};
    } else if (lastSourceIndex === 1) {
        self.updateStageIndexes = () => {
            if (stageIndexes.current === 0) {
                stageIndexes.next = 1;
                delete stageIndexes.previous;
            } else {
                stageIndexes.previous = 0;
                delete stageIndexes.next;
            }
        };
    } else {
        self.updateStageIndexes = () => {
            stageIndexes.previous = self.getPreviousSlideIndex();
            stageIndexes.next = self.getNextSlideIndex();
        };
    }


    // set up isSourceInStage
    // if there are 3, 2, 1 slides all sources will be always in stage
    (lastSourceIndex <= 2) ?
        self.isSourceInStage = () => true :
        self.isSourceInStage = (index) => {
            const currentIndex = stageIndexes.current;

            if ((currentIndex === 0 && index === lastSourceIndex)
                || (currentIndex === lastSourceIndex && index === 0))
                return true;

            const difference = currentIndex - index;

            return difference === -1 ||
                difference === 0 ||
                difference === 1;
        };
}
