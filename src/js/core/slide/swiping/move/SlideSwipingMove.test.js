import * as getAnimationDebounceObject from "../../../animations/getAnimationDebounce";
import { SlideSwipingMove } from "./SlideSwipingMove";
import { SlideSwipingMoveActioner } from "./SlideSwipingMoveActioner";

const fsLightbox = {
    props: { sources: { length: 2 } },
    resolve: (constructor) => {
        if (constructor === SlideSwipingMoveActioner) {
            return slideSwipingMoveActioner;
        } else throw new Error('Invalid dependency');
    },
    slideSwipingProps: { isSwiping: false },
};
const slideSwipingMoveActioner = { runActionsForEvent: jest.fn() };
let slideSwipingMove;

let isPreviousAnimationDebounced = false;
getAnimationDebounceObject.getAnimationDebounce = jest.fn(() => () => isPreviousAnimationDebounced);
const e = 'event';

const setUp = () => {
    slideSwipingMove = new SlideSwipingMove(fsLightbox);
    slideSwipingMove.listener(e);
};

test('listener', () => {
    setUp();
    expect(fsLightbox.slideSwipingProps.swipedX).toBeUndefined();
    expect(slideSwipingMoveActioner.runActionsForEvent).not.toBeCalled();

    fsLightbox.slideSwipingProps.isSwiping = true;
    setUp();
    expect(fsLightbox.slideSwipingProps.swipedX).toBeUndefined();
    expect(slideSwipingMoveActioner.runActionsForEvent).not.toBeCalled();

    fsLightbox.slideSwipingProps.isSwiping = false;
    isPreviousAnimationDebounced = true;
    setUp();
    expect(fsLightbox.slideSwipingProps.swipedX).toBeUndefined();
    expect(slideSwipingMoveActioner.runActionsForEvent).not.toBeCalled();

    fsLightbox.slideSwipingProps.isSwiping = true;
    isPreviousAnimationDebounced = true;
    setUp();
    expect(fsLightbox.slideSwipingProps.swipedX).toBeUndefined();
    expect(slideSwipingMoveActioner.runActionsForEvent).toBeCalledWith(e);

    fsLightbox.props.sources.length = 1;
    setUp();
    expect(fsLightbox.slideSwipingProps.swipedX).toBe(1);
    expect(slideSwipingMoveActioner.runActionsForEvent).toBeCalledTimes(1);
}); 
