import { ANIMATION_TIME } from "../../cn/css-constants";
import {
    FADE_IN_CLASS_NAME, FADE_IN_STRONG_CLASS_NAME,
    FADE_OUT_CLASS_NAME,
    TRANSFORM_TRANSITION_CLASS_NAME,
} from "../../cn/classes-names";
import { removeFromElementClassIfContains } from "../../h/elements/removeFromElementClassIfContains";
import { getQueuedAction } from "../timeouts/getQueuedAction";

export function setUpSlideIndexChanger(o) {
var{
	ap,
        componentsServices,
        core: { slideIndexChanger: self, sourceDisplayFacade, stageManager },
        elements: { smw, sourceAnimationWrappers },
	isl,
        stageIndexes,
	sws
    }=o;
    self.changeTo = (i) => {
	ap.c(stageIndexes.current, i);
        stageIndexes.current = i;

        stageManager.updateStageIndexes();

        o.sn(i+1);

        sourceDisplayFacade.displaySourcesWhichShouldBeDisplayed();
    };

    self.jumpTo = (i) => {
        var opi=stageIndexes.previous,oi=stageIndexes.current,oni=stageIndexes.next,ipl=isl[oi],icl=isl[i];
        self.changeTo(i);

	for (var j = 0; j < smw.length; j++) {
		smw[j].d();
	}

	sws.d(oi);
	sws.c();

	requestAnimationFrame(function(){
		requestAnimationFrame(function(){
			var pi=stageIndexes.previous,ni=stageIndexes.next;

			// The checking whether the source is loaded was done before reflow because if source would load after a slide change but before a reflow, inexpected animation may be added—in the case of a current source, a slide change animation would be added instead of initial animation after a load.
			if (ipl) {
				sourceAnimationWrappers[oi]
					.classList.add(FADE_OUT_CLASS_NAME);
			}
			if (icl) {
				sourceAnimationWrappers[stageIndexes.current]
					.classList.add(FADE_IN_CLASS_NAME);
			}

			sws.a();

			if (pi !== undefined && pi !== oi) {
				smw[pi].ne();
			}
			smw[stageIndexes.current].n();
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
				if (!stageManager.i(oi)) {
					smw[oi].h();
					smw[oi].n();
				} else if (oi === stageIndexes.previous) {
					smw[oi].ne();
				} else if (oi === stageIndexes.next) {
					smw[oi].p();
				}
			}
		});
	});
    };
}
