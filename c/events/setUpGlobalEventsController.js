import { KeyboardController } from "../keyboard/KeyboardController";
import { SourcesPointerMove } from "../sources/pointering/move/SourcesPointerMove";
import { SourcesPointerUp } from "../sources/pointering/up/SourcesPointerUp";

export function setUpGlobalEventsController(
    {
        core: { globalEventsController: self, windowResizeActioner, },
	fs,
        resolve
    }
) {
    const keyboardController = resolve(KeyboardController);
    const sourcesPointerMove = resolve(SourcesPointerMove);
    const sourcesPointerUp = resolve(SourcesPointerUp);

    self.attachListeners = () => {
        document.addEventListener('pointermove', sourcesPointerMove.listener);

        document.addEventListener('pointerup', sourcesPointerUp.listener);

        addEventListener('resize', windowResizeActioner.runActions);

        document.addEventListener('keydown', keyboardController.listener);

	fs.l();
    };

    self.removeListeners = () => {
        document.removeEventListener('pointermove', sourcesPointerMove.listener);

        document.removeEventListener('pointerup', sourcesPointerUp.listener);

        removeEventListener('resize', windowResizeActioner.runActions);

        document.removeEventListener('keydown', keyboardController.listener);

	fs.q();
    };
}
