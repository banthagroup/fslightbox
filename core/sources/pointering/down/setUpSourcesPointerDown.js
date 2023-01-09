import { SOURCE_MAIN_WRAPPERS } from "../../../../constants/elements";
import { TRANSFORM_TRANSITION_CLASS_NAME } from "../../../../constants/classes-names";

export function setUpSourcesPointerDown(
    {
        core: { classFacade, sourcesPointerDown: self },
        elements: { sources },
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

        classFacade.removeFromEachElementClassIfContains(SOURCE_MAIN_WRAPPERS, TRANSFORM_TRANSITION_CLASS_NAME);
    };
}


