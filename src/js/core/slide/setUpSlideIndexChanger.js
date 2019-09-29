import { ANIMATION_TIME } from "../../constants/css-constants";
import { SOURCES_INNERS, SOURCES_OUTERS } from "../../constants/elements";
import {
    FADE_IN_CLASS_NAME, FADE_IN_STRONG_CLASS_NAME,
    FADE_OUT_CLASS_NAME,
    TRANSFORM_TRANSITION_CLASS_NAME,
} from "../../constants/classes-names";
import { removeFromElementClassIfContains } from "../../helpers/elements/removeFromElementClassIfContains";
import { getQueuedAction } from "../timeouts/getQueuedAction";

export function setUpSlideIndexChanger(
    {
        collections: { sourcesOutersTransformers },
        componentsServices,
        core: { classFacade, slideIndexChanger: self, stageManager },
        elements: { sourcesInners },
        stageIndexes
    }
) {
    const runQueuedRemoveFadeOut = getQueuedAction(() => {
        classFacade.removeFromEachElementClassIfContains(SOURCES_INNERS, FADE_OUT_CLASS_NAME);
    }, ANIMATION_TIME);

    self.changeTo = (i) => {
        stageIndexes.current = i;
        stageManager.updateStageIndexes();
        componentsServices.setSlideNumber(i + 1);
    };

    self.jumpTo = (i) => {
        let previousI = stageIndexes.current;
        self.changeTo(i);

        classFacade.removeFromEachElementClassIfContains(SOURCES_OUTERS, TRANSFORM_TRANSITION_CLASS_NAME);

        removeFromElementClassIfContains(sourcesInners[previousI], FADE_IN_STRONG_CLASS_NAME);
        removeFromElementClassIfContains(sourcesInners[previousI], FADE_IN_CLASS_NAME);
        sourcesInners[previousI].classList.add(FADE_OUT_CLASS_NAME);

        removeFromElementClassIfContains(sourcesInners[i], FADE_IN_STRONG_CLASS_NAME);
        removeFromElementClassIfContains(sourcesInners[i], FADE_OUT_CLASS_NAME);
        sourcesInners[i].classList.add(FADE_IN_CLASS_NAME);

        // we need to remove fade out from all sources because if someone used slide swiping during animation timeout
        // we cannot detect what slide will be
        runQueuedRemoveFadeOut();

        sourcesOutersTransformers[i].zero();

        setTimeout(() => {
            if (previousI !== stageIndexes.current) {
                sourcesOutersTransformers[previousI].negative();
            }
        }, ANIMATION_TIME - 30);
    };
}
