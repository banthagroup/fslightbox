import { CUSTOM_TYPE, IMAGE_TYPE, INVALID_TYPE, VIDEO_TYPE, YOUTUBE_TYPE } from "../../../cn/core-constants";
import { SourceLoadHandler } from "../SourceLoadHandler";
import { i } from "../../../cm/i";
import { v } from "../../../cm/v";
import { y } from "../../../cm/y";
import { c } from "../../../cm/c";
import { in } from "../../../cm/in";

export function DetectedTypeActioner(fsLightbox) {
    const {
        collections: { sourceLoadHandlers, sourcesRenderFunctions },
        core: { sourceDisplayFacade },
        resolve
    } = fsLightbox;

    this.runActionsForSourceTypeAndIndex = (type, i) => {
        if (type !== INVALID_TYPE) {
            sourceLoadHandlers[i] = resolve(SourceLoadHandler, [i]);
        }

        let renderFunction;

        switch (type) {
            case IMAGE_TYPE:
                renderFunction = i;
                break;
            case VIDEO_TYPE:
                renderFunction = v;
                break;
            case YOUTUBE_TYPE:
                renderFunction = y;
                break;
            case CUSTOM_TYPE:
                renderFunction = c;
                break;
            default:
                renderFunction = in;
                break;
        }

        sourcesRenderFunctions[i] = () => renderFunction(fsLightbox, i);
        sourceDisplayFacade.displaySourcesWhichShouldBeDisplayed();
    };
}
