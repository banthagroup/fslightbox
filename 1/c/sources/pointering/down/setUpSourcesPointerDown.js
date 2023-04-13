export function setUpSourcesPointerDown(
    {
        core: { sourcesPointerDown: self },
        elements: { smw, sources },
        sourcePointerProps,
        stageIndexes
    }
) {
    self.listener = (e) => {
        /**
         * Preventing default to disable image 'copying' behavior on Firefox desktop browser.
         * Cannot prevent default on video click because video would become unclickable in IE11.
         */
        if (e.target.tagName !== 'VIDEO') {
            e.preventDefault();
        }

        sourcePointerProps.isPointering = true;

        sourcePointerProps.downScreenX = e.screenX;

        sourcePointerProps.swipedX = 0;

        const currentElement = sources[stageIndexes.current];
        (currentElement && currentElement.contains(e.target)) ?
            sourcePointerProps.isSourceDownEventTarget = true :
            sourcePointerProps.isSourceDownEventTarget = false;

	for (var i=0;i<smw.length;i++) {
		smw[i].d();
	}
    };
}


