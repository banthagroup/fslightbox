import { getClientXFromEvent } from "../../../../helpers/events/getClientXFromEvent";
import { SOURCE_MAIN_WRAPPERS } from "../../../../constants/elements";
import { TRANSFORM_TRANSITION_CLASS_NAME } from "../../../../constants/classes-names";

export function setUpSlideSwipingDown(
    {
        core: { classFacade, slideSwipingDown: self },
        elements: { sources },
        slideSwipingProps,
        stageIndexes
    }
) {
    self.listener = (e) => {
        slideSwipingProps.isSwiping = true;

        slideSwipingProps.downClientX = getClientXFromEvent(e);

        slideSwipingProps.swipedX = 0;

        // cannot prevent default action when target is video because buttons would be not clickable
        // cannot prevent event on mobile because we use passive event listener for touch start
        if (e.target.tagName !== 'VIDEO' && !e.touches) {
            e.preventDefault();
        }

        const currentElement = sources[stageIndexes.current];
        (currentElement && currentElement.contains(e.target)) ?
            slideSwipingProps.isSourceDownEventTarget = true :
            slideSwipingProps.isSourceDownEventTarget = false;

        classFacade.removeFromEachElementClassIfContains(SOURCE_MAIN_WRAPPERS, TRANSFORM_TRANSITION_CLASS_NAME);
    };
}


