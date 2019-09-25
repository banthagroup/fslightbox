import { setUpGlobalEventsController } from "./setUpGlobalEventsController";
import { SlideSwipingMove } from "../slide/swiping/move/SlideSwipingMove";
import { SlideSwipingUp } from "../slide/swiping/up/SlideSwipingUp";
import { KeyboardController } from "../keyboard/KeyboardController";

const fsLightbox = {
    core: {
        globalEventsController: {},
        windowResizeActioner: { runActions: 'window-resize-actioner-listener' }
    },
    resolve: (constructor) => {
        if (constructor === SlideSwipingMove) {
            return { listener: 'slide-swiping-move-listener' };
        } else if (constructor === SlideSwipingUp) {
            return { listener: 'slide-swiping-up-listener' };
        } else if (constructor === KeyboardController) {
            return { listener: 'keyboard-controller-listener' }
        } else throw new Error('Invalid dependency');
    }
};
const globalEventsController = fsLightbox.core.globalEventsController;
setUpGlobalEventsController(fsLightbox);

addEventListener = jest.fn();
removeEventListener = jest.fn();
document.addEventListener = jest.fn();
document.removeEventListener = jest.fn();

test('attachListeners', () => {
    globalEventsController.attachListeners();
    expect(document.addEventListener).toBeCalledWith('mousemove', 'slide-swiping-move-listener');
    expect(document.addEventListener).toBeCalledWith('touchmove', 'slide-swiping-move-listener', { passive: true });
    expect(document.addEventListener).toBeCalledWith('mouseup', 'slide-swiping-up-listener');
    expect(document.addEventListener).toBeCalledWith('touchend', 'slide-swiping-up-listener', { passive: true });
    expect(addEventListener).toBeCalledWith('resize', 'window-resize-actioner-listener');
    expect(document.addEventListener).toBeCalledWith('keydown', 'keyboard-controller-listener');
});

test('removeListeners', () => {
    globalEventsController.removeListeners();
    expect(document.removeEventListener).toBeCalledWith('mousemove', 'slide-swiping-move-listener');
    expect(document.removeEventListener).toBeCalledWith('touchmove', 'slide-swiping-move-listener');
    expect(document.removeEventListener).toBeCalledWith('mouseup', 'slide-swiping-up-listener');
    expect(document.removeEventListener).toBeCalledWith('touchend', 'slide-swiping-up-listener');
    expect(removeEventListener).toBeCalledWith('resize', 'window-resize-actioner-listener');
    expect(document.removeEventListener).toBeCalledWith('keydown', 'keyboard-controller-listener');
});
