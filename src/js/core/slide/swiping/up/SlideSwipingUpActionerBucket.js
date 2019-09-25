import { TRANSFORM_TRANSITION_CLASS_NAME } from "../../../../constants/classes-names";

export function SlideSwipingUpActionerBucket(
    {
        collections: { sourcesOutersTransformers },
        core: { slideIndexChanger },
        elements: { sourcesOuters },
        stageIndexes
    }
) {
    this.runPositiveSwipedXActions = () => {
        if (stageIndexes.previous === undefined) {
            addTransitionToCurrentSourceHolderAndTransformItToPosition('zero');
        } else {
            addTransitionToCurrentSourceHolderAndTransformItToPosition('positive');
            slideIndexChanger.changeTo(stageIndexes.previous);
            addTransitionToCurrentSourceHolderAndTransformItToPosition('zero');
        }
    };

    this.runNegativeSwipedXActions = () => {
        if (stageIndexes.next === undefined) {
            addTransitionToCurrentSourceHolderAndTransformItToPosition('zero');
        } else {
            addTransitionToCurrentSourceHolderAndTransformItToPosition('negative');
            slideIndexChanger.changeTo(stageIndexes.next);
            addTransitionToCurrentSourceHolderAndTransformItToPosition('zero');
        }
    };

    const addTransitionToCurrentSourceHolderAndTransformItToPosition = (position) => {
        sourcesOuters[stageIndexes.current].current.classList.add(TRANSFORM_TRANSITION_CLASS_NAME);
        sourcesOutersTransformers[stageIndexes.current][position]();
    };
}
