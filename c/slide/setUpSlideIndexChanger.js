import { ANIMATION_TIME } from "../../cn/css-constants";
import { SOURCE_ANIMATION_WRAPPERS, SOURCE_MAIN_WRAPPERS } from "../../cn/elements";
import {
    FADE_IN_CLASS_NAME, FADE_IN_STRONG_CLASS_NAME,
    FADE_OUT_CLASS_NAME,
    TRANSFORM_TRANSITION_CLASS_NAME,
} from "../../cn/classes-names";
import { removeFromElementClassIfContains } from "../../h/elements/removeFromElementClassIfContains";
import { getQueuedAction } from "../timeouts/getQueuedAction";

export function setUpSlideIndexChanger(
    {
        componentsServices,
        core: { classFacade, slideIndexChanger: self, sourceDisplayFacade, stageManager },
        elements: { smw, sourceAnimationWrappers },
	isl,
        stageIndexes,
	sws
    }
) {
    const runQueuedRemoveFadeOut = getQueuedAction(() => {
        classFacade.removeFromEachElementClassIfContains(SOURCE_ANIMATION_WRAPPERS, FADE_OUT_CLASS_NAME);
    }, ANIMATION_TIME);

    self.changeTo = (i) => {
        stageIndexes.current = i;

        stageManager.updateStageIndexes();

        componentsServices.setSlideNumber(i + 1);

        sourceDisplayFacade.displaySourcesWhichShouldBeDisplayed();
    };

    self.jumpTo = (i) => {
        var opi=stageIndexes.previous,oci=stageIndexes.current,oni=stageIndexes.current,ipl=isl[oci],icl=isl[i];
        self.changeTo(i);
	var pi=stageIndexes.previous,ni=stageIndexes.next;

        classFacade.removeFromEachElementClassIfContains(
		SOURCE_MAIN_WRAPPERS,
		TRANSFORM_TRANSITION_CLASS_NAME
	);

	sws.d(oi);
	sws.c();

	requestAnimationFrame(function(){
		requestAnimationFrame(function(){
			// The checking whether the source is loaded was done before reflow because if source would load after a slide change but before a reflow, inexpected animation may be added—in the case of a current source, a slide change animation would be added instead of initial animation after a load.
			if (ipl) {
				sourceAnimationWrappers[oci]
					.classList.add(FADE_OUT_CLASS_NAME);
			}
			if (icl) {
				sourceAnimationWrappers[i]
					.classList.add(FADE_IN_CLASS_NAME);
			}

			sws.a();

			if (pi !== undefined && pi !== oi) {
				smw[pi].ne();
			}
			smw[i].n();
			if (ni !== undefined && ni !== oi) {
				smw[ni].p();
			}

			sws.b(opi);
			sws.b(oni);

			// If source is not loaded, then there are no animations, therefore no postponed transform.
			if (isl[oi]) {
				setTimeout(hoss, ANIMATION_TIME - 40);		
			} else {
				hoss();
			}

			function hoss() {
				if (!stageManager.is(oi)) {
					smw[oi].h();
					smw[oi].n();
				} else if (oi === pi) {
					smw[oi].ne();
				} else if (oi === ni) {
					smw[oi].p();
				}
			}
		});
	});

        removeFromElementClassIfContains(sourceAnimationWrappers[previousI], FADE_IN_STRONG_CLASS_NAME);
        removeFromElementClassIfContains(sourceAnimationWrappers[previousI], FADE_IN_CLASS_NAME);
        sourceAnimationWrappers[previousI].classList.add(FADE_OUT_CLASS_NAME);

        removeFromElementClassIfContains(sourceAnimationWrappers[i], FADE_IN_STRONG_CLASS_NAME);
        removeFromElementClassIfContains(sourceAnimationWrappers[i], FADE_OUT_CLASS_NAME);
        sourceAnimationWrappers[i].classList.add(FADE_IN_CLASS_NAME);

        // we need to remove fade out from all sources because if someone used slide swiping during animation timeout
        // we cannot detect what slide will be
        runQueuedRemoveFadeOut();
    };
}
