import { SlideSwipingUpActionerBucket } from "./SlideSwipingUpActionerBucket";
import { CURSOR_GRABBING_CLASS_NAME } from "../../../../constants/classes-names";

export function SlideSwipingUpActioner(
    {
        core: { lightboxCloser },
        elements: { container, slideSwipingHoverer },
        resolve,
        slideSwipingProps
    }
) {
    const slideSwipingUpActionsBucket = resolve(SlideSwipingUpActionerBucket);

    this.runNoSwipeActions = () => {
        if (!slideSwipingProps.isSourceDownEventTarget) {
            lightboxCloser.close();
        }

        slideSwipingProps.isSwiping = false;
    };

    this.runActions = () => {
        if (slideSwipingProps.swipedX > 0) {
            slideSwipingUpActionsBucket.runPositiveSwipedXActions();
        } else {
            slideSwipingUpActionsBucket.runNegativeSwipedXActions();
        }

        container.removeChild(slideSwipingHoverer);

        container.classList.remove(CURSOR_GRABBING_CLASS_NAME);

        slideSwipingProps.isSwiping = false;
    };
}
