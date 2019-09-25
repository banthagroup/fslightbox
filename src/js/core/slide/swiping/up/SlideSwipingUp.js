import { SlideSwipingUpActioner } from "./SlideSwipingUpActioner";

export function SlideSwipingUp({ resolve, slideSwipingProps }) {
    const slideSwipingUpActioner = resolve(SlideSwipingUpActioner);

    this.listener = () => {
        if (slideSwipingProps.isSwiping) {
            (slideSwipingProps.swipedX) ?
                slideSwipingUpActioner.runActions() :
                slideSwipingUpActioner.runNoSwipeActions();
        }
    };
}
