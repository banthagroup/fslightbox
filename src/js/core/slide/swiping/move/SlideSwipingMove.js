import { SlideSwipingMoveActioner } from "./SlideSwipingMoveActioner";
import { getAnimationDebounce } from "../../../animations/getAnimationDebounce";

export function SlideSwipingMove({ props: { sources }, resolve, slideSwipingProps }) {
    const slideSwipingMoveActioner = resolve(SlideSwipingMoveActioner);
    const isPreviousAnimationDebounced = getAnimationDebounce();

    (sources.length === 1) ?
        this.listener = () => {
            // if there is only one slide we need to simulate swipe to prevent lightbox from closing
            slideSwipingProps.swipedX = 1;
        } :
        this.listener = (e) => {
            if (slideSwipingProps.isSwiping && isPreviousAnimationDebounced()) {
                slideSwipingMoveActioner.runActionsForEvent(e);
            }
        };
}
