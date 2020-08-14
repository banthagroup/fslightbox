import { FADE_OUT_STRONG_CLASS_NAME, OPEN_CLASS_NAME } from "../../../constants/classes-names";
import { ANIMATION_TIME } from "../../../constants/css-constants";

export function LightboxCloseActioner(
    {
        core: {
            eventsDispatcher,
            fullscreenToggler,
            globalEventsController,
            scrollbarRecompensor
        },
        data,
        elements,
        props,
        slideSwipingProps
    }
) {
    this.isLightboxFadingOut = false;

    this.runActions = () => {
        this.isLightboxFadingOut = true;

        elements.container.classList.add(FADE_OUT_STRONG_CLASS_NAME);

        globalEventsController.removeListeners();

        if (props.exitFullscreenOnClose && data.isFullscreenOpen) {
            fullscreenToggler.exitFullscreen();
        }

        setTimeout(() => {
            this.isLightboxFadingOut = false;

            slideSwipingProps.isSwiping = false;

            elements.container.classList.remove(FADE_OUT_STRONG_CLASS_NAME);
            document.documentElement.classList.remove(OPEN_CLASS_NAME);

            scrollbarRecompensor.removeRecompense();

            document.body.removeChild(elements.container);

            eventsDispatcher.dispatch('onClose');
        }, ANIMATION_TIME - 30);
    };
}
