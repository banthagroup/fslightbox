import { removeFromElementClassIfContains } from "../../h/elements/removeFromElementClassIfContains";

export function setUpWindowResizeActioner(
    {
        collections: { sourceSizers },
        core: { windowResizeActioner: self },
        data,
        elements: { smw },
        stageIndexes
    }
) {
    self.runActions = () => {
        // decreasing max source dimensions for better UX
        (innerWidth < 992) ?
            data.maxSourceWidth = innerWidth :
            data.maxSourceWidth = 0.9 * innerWidth;
        data.maxSourceHeight = 0.9 * innerHeight;

        for (let i = 0; i < smw.length; i++) {
            smw[i].d();	

            // if source is Invalid or if lightbox is initialized there are no sourceSizers
            // so we need to check if it exists
            if (sourceSizers[i]) {
                sourceSizers[i].adjustSize();
            }
        }

	var pi=stageIndexes.previous,ni=stageIndexes.next;
	if (pi !== undefined) {
		smw[pi].ne();
	}
	if (ni !== undefined) {
		smw[ni].p();
	}
    };
}
