import { CURSOR_GRABBING_CLASS_NAME } from "../../../../constants/classes-names";
import { getClientXFromEvent } from "../../../../helpers/events/getClientXFromEvent";

export function SlideSwipingMoveActioner(
    {
        collections: { sourcesOutersTransformers },
        elements,
        slideSwipingProps,
        stageIndexes
    }
) {
    this.runActionsForEvent = (e) => {
        // we are showing InvisibleHover component in move event not in down event
        // due to IE problems with videos sources controlling
        if (!elements.container.contains(elements.slideSwipingHoverer)) {
            elements.container.appendChild(elements.slideSwipingHoverer);
        }

        elements.container.classList.add(CURSOR_GRABBING_CLASS_NAME);

        slideSwipingProps.swipedX = getClientXFromEvent(e) - slideSwipingProps.downClientX;

        transformSourceHolderAtIndexToPosition(stageIndexes.current, 'zero');
        // if there are only two slides we need to check if source we want to transform exists
        if (stageIndexes.previous !== undefined && slideSwipingProps.swipedX > 0) {
            transformSourceHolderAtIndexToPosition(stageIndexes.previous, 'negative');
        } else if (stageIndexes.next !== undefined && slideSwipingProps.swipedX < 0) {
            transformSourceHolderAtIndexToPosition(stageIndexes.next, 'positive');
        }
    };

    const transformSourceHolderAtIndexToPosition = (index, position) => {
        sourcesOutersTransformers[index]
            .byValue(slideSwipingProps.swipedX)
            [position]();
    };
}
