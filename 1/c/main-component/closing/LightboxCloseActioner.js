import { FADE_OUT_STRONG_CLASS_NAME, OPEN_CLASS_NAME } from "../../../cn/classes-names";
import { ANIMATION_TIME } from "../../../cn/css-constants";

export function LightboxCloseActioner(o) {
     var {
        core: {
            eventsDispatcher,
            globalEventsController,
            scrollbarRecompensor
        },
        data,
        elements,
	fs,
        props,
        sourcePointerProps
    } = o;

    this.runActions = () => {
        this.i = 1;

        elements.container.classList.add(FADE_OUT_STRONG_CLASS_NAME);

        globalEventsController.removeListeners();

        if (props.exitFullscreenOnClose&&o.ifs)
            fs.x();

        setTimeout(() => {
		this.i=0;

            sourcePointerProps.isPointering = false;

            elements.container.classList.remove(FADE_OUT_STRONG_CLASS_NAME);
            document.documentElement.classList.remove(OPEN_CLASS_NAME);

            scrollbarRecompensor.removeRecompense();

            document.body.removeChild(elements.container);

            eventsDispatcher.dispatch('onClose');
        }, ANIMATION_TIME - 30);
    };
}
