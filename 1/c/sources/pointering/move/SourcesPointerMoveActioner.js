import { CURSOR_GRABBING_CLASS_NAME } from "../../../../cn/classes-names";
import { addToElementClassIfNotContains } from "../../../../h/elements/addToElementClassIfNotContains";

export function SourcesPointerMoveActioner(
    {
        elements,
        sourcePointerProps,
        stageIndexes
    }
) {
    this.runActionsForEvent = (e) => {
        // we are showing InvisibleHover component in move event not in down event
        // due to IE problems with videos sources controlling
        if (!elements.container.contains(elements.slideSwipingHoverer)) {
            elements.container.appendChild(elements.slideSwipingHoverer);
        }

        addToElementClassIfNotContains(elements.container, CURSOR_GRABBING_CLASS_NAME);

        sourcePointerProps.swipedX = e.screenX - sourcePointerProps.downScreenX;

	var pi=stageIndexes.previous,ni=stageIndexes.next;
        t(stageIndexes.current, "z");
        if (pi !== undefined && sourcePointerProps.swipedX > 0) {
            t(pi, "ne");
        } else if (ni !== undefined && sourcePointerProps.swipedX < 0) {
            t(ni, "p");
        }
    };

    function t(i, p) {
	elements.smw[i].v(sourcePointerProps.swipedX)[p]()
    }
}
