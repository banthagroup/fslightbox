import { TRANSFORM_TRANSITION_CLASS_NAME } from "../../../../cn/classes-names";

export function SourcesPointerUpActionerBucket(
    {
        core: { slideIndexChanger },
        elements: { smw },
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
	var w=smw[stageIndexes.current];
	w.a();
        w[position]();
    };
}
