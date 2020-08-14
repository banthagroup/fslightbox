import { SlideSwipingUpActionerBucket } from "./SlideSwipingUpActionerBucket";
import { CURSOR_GRABBING_CLASS_NAME } from "../../../../constants/classes-names";
import { removeFromElementChildIfContains } from '../../../../helpers/elements/removeFromElementChildIfContains';

export function SlideSwipingUpActioner(
    {
        core: { lightboxCloser },
        elements,
        resolve,
        slideSwipingProps
    }
) {
    const slideSwipingUpActionsBucket = resolve(SlideSwipingUpActionerBucket);

    this.runNoSwipeActions = () => {
        removeFromElementChildIfContains(elements.container, elements.slideSwipingHoverer);

        if (!slideSwipingProps.isSourceDownEventTarget) {
            lightboxCloser.closeLightbox();
        }

        slideSwipingProps.isSwiping = false;
    };

    this.runActions = () => {
        if (slideSwipingProps.swipedX > 0) {
            slideSwipingUpActionsBucket.runPositiveSwipedXActions();
        } else {
            slideSwipingUpActionsBucket.runNegativeSwipedXActions();
        }

        removeFromElementChildIfContains(elements.container, elements.slideSwipingHoverer);

        elements.container.classList.remove(CURSOR_GRABBING_CLASS_NAME);

        slideSwipingProps.isSwiping = false;
    };
}
