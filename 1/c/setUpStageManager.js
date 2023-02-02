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

    (lastSourceIndex <= 2) ?
        self.i = () => true :
        self.i = (index) => {
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
