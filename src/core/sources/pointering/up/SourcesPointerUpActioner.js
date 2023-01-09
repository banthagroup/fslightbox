import { SourcesPointerUpActionerBucket } from "./SourcesPointerUpActionerBucket";
import { CURSOR_GRABBING_CLASS_NAME } from "../../../../constants/classes-names";
import { removeFromElementChildIfContains } from '../../../../helpers/elements/removeFromElementChildIfContains';

export function SourcesPointerUpActioner(
    {
        core: { lightboxCloser },
        elements,
        resolve,
        sourcePointerProps
    }
) {
    const sourcesPointerUpActionsBucket = resolve(SourcesPointerUpActionerBucket);

    this.runNoSwipeActions = () => {
        removeFromElementChildIfContains(elements.container, elements.slideSwipingHoverer);

        if (!sourcePointerProps.isSourceDownEventTarget) {
            lightboxCloser.closeLightbox();
        }

        sourcePointerProps.isPointering = false;
    };

    this.runActions = () => {
        if (sourcePointerProps.swipedX > 0) {
            sourcesPointerUpActionsBucket.runPositiveSwipedXActions();
        } else {
            sourcesPointerUpActionsBucket.runNegativeSwipedXActions();
        }

        removeFromElementChildIfContains(elements.container, elements.slideSwipingHoverer);

        elements.container.classList.remove(CURSOR_GRABBING_CLASS_NAME);

        sourcePointerProps.isPointering = false;
    };
}
