import { SlideSwipingUp } from "./SlideSwipingUp";
import { SlideSwipingUpActioner } from "./SlideSwipingUpActioner";

const fsLightbox = {
    resolve: (constructorDependency) => {
        if (constructorDependency === SlideSwipingUpActioner) {
            return slideSwipingUpActioner;
        } else throw new Error('Invalid dependency');
    },
    slideSwipingProps: {}
};
const slideSwipingUpActioner = { runNoSwipeActions: jest.fn(), runActions: jest.fn() };
const slideSwipingUp = new SlideSwipingUp(fsLightbox);

test('listener', () => {
    fsLightbox.slideSwipingProps.isSwiping = false;
    fsLightbox.slideSwipingProps.swipedX = 1000;
    slideSwipingUp.listener();
    expect(slideSwipingUpActioner.runActions).not.toBeCalled();
    expect(slideSwipingUpActioner.runNoSwipeActions).not.toBeCalled();

    fsLightbox.slideSwipingProps.isSwiping = true;
    fsLightbox.slideSwipingProps.swipedX = 1000;
    slideSwipingUp.listener();
    expect(slideSwipingUpActioner.runActions).toBeCalled();
    expect(slideSwipingUpActioner.runNoSwipeActions).not.toBeCalled();

    fsLightbox.slideSwipingProps.isSwiping = true;
    fsLightbox.slideSwipingProps.swipedX = 0;
    slideSwipingUp.listener();
    expect(slideSwipingUpActioner.runActions).toBeCalledTimes(1);
    expect(slideSwipingUpActioner.runNoSwipeActions).toBeCalled();
});
