import { removeFromElementClassIfContains } from "../../h/elements/removeFromElementClassIfContains";

export function setUpWindowResizeActioner(o) {
	var     {
        collections: { sourceSizers },
        core: { windowResizeActioner: self },
        data,
        elements: { smw },
	props: { sourceMargin },
        stageIndexes
    } = o, x = 1 - 2 * sourceMargin;

    self.runActions = () => {
        (innerWidth > 992) ?
            o.mw = x * innerWidth :
            o.mw = innerWidth;
        o.mh = x * innerHeight;

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
