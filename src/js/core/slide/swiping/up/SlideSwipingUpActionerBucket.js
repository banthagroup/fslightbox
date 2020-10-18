import { TRANSFORM_TRANSITION_CLASS_NAME } from "../../../../constants/classes-names";

export function SlideSwipingUpActionerBucket(
    {
        collections: { sourceMainWrappersTransformers },
        core: { slideIndexChanger },
        elements: { sourceMainWrappers },
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
        sourceMainWrappers[stageIndexes.current].classList.add(TRANSFORM_TRANSITION_CLASS_NAME);
        sourceMainWrappersTransformers[stageIndexes.current][position]();
    };
}
