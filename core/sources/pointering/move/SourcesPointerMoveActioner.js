import { CURSOR_GRABBING_CLASS_NAME } from "../../../../constants/classes-names";
import { addToElementClassIfNotContains } from "../../../../helpers/elements/addToElementClassIfNotContains";

export function SourcesPointerMoveActioner(
    {
        collections: { sourceMainWrappersTransformers },
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

        transformSourceHolderAtIndexToPosition(stageIndexes.current, 'zero');
        // if there are only two slides we need to check if source we want to transform exists
        if (stageIndexes.previous !== undefined && sourcePointerProps.swipedX > 0) {
            transformSourceHolderAtIndexToPosition(stageIndexes.previous, 'negative');
        } else if (stageIndexes.next !== undefined && sourcePointerProps.swipedX < 0) {
            transformSourceHolderAtIndexToPosition(stageIndexes.next, 'positive');
        }
    };

    function transformSourceHolderAtIndexToPosition(index, position) {
        sourceMainWrappersTransformers[index]
            .byValue(sourcePointerProps.swipedX)
            [position]();
    }
}
