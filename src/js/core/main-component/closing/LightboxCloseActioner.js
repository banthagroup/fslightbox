import { FADE_OUT_STRONG_CLASS_NAME, OPEN_CLASS_NAME } from "../../../constants/classes-names";
import { ANIMATION_TIME } from "../../../constants/css-constants";

export function LightboxCloseActioner(
    {
        componentsStates: { toolbarButtons: { fullscreen: isFullscreenOpenState } },
        core: {
            eventsDispatcher,
            fullscreenToggler,
            globalEventsController,
            scrollbarRecompensor
        },
        elements: { container: lightboxContainer },
        setMainComponentState,
        slideSwipingProps
    }
) {
    this.isLightboxFadingOut = false;

    this.runActions = () => {
        this.isLightboxFadingOut = true;
        lightboxContainer.current.classList.add(FADE_OUT_STRONG_CLASS_NAME);
        globalEventsController.removeListeners();

        if (isFullscreenOpenState.get()) {
            fullscreenToggler.enterFullscreen();
        }

        setTimeout(() => {
            this.isLightboxFadingOut = false;
            slideSwipingProps.isSwiping = false;
            lightboxContainer.current.classList.remove(FADE_OUT_STRONG_CLASS_NAME);
            document.documentElement.classList.remove(OPEN_CLASS_NAME);
            scrollbarRecompensor.removeRecompense();

            setMainComponentState({
                isOpen: false
            }, () => {
                eventsDispatcher.dispatch('onClose');
            });
        }, ANIMATION_TIME - 30);
    };
}
