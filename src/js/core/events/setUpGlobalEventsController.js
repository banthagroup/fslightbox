import { KeyboardController } from "../keyboard/KeyboardController";
import { SlideSwipingMove } from "../slide/swiping/move/SlideSwipingMove";
import { SlideSwipingUp } from "../slide/swiping/up/SlideSwipingUp";

export function setUpGlobalEventsController(
    {
        core: { globalEventsController: self, windowResizeActioner, },
        resolve
    }
) {
    const keyboardController = resolve(KeyboardController);
    const slideSwipingMove = resolve(SlideSwipingMove);
    const slideSwipingUp = resolve(SlideSwipingUp);

    self.attachListeners = () => {
        document.addEventListener('mousemove', slideSwipingMove.listener);
        document.addEventListener('touchmove', slideSwipingMove.listener, { passive: true });

        document.addEventListener('mouseup', slideSwipingUp.listener);
        document.addEventListener('touchend', slideSwipingUp.listener, { passive: true });

        addEventListener('resize', windowResizeActioner.runActions);

        document.addEventListener('keydown', keyboardController.listener);
    };

    self.removeListeners = () => {
        document.removeEventListener('mousemove', slideSwipingMove.listener);
        document.removeEventListener('touchmove', slideSwipingMove.listener);

        document.removeEventListener('mouseup', slideSwipingUp.listener);
        document.removeEventListener('touchend', slideSwipingUp.listener);

        removeEventListener('resize', windowResizeActioner.runActions);

        document.removeEventListener('keydown', keyboardController.listener);
    };
}
