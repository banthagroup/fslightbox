import { CUSTOM_TYPE, IMAGE_TYPE, INVALID_TYPE, VIDEO_TYPE, YOUTUBE_TYPE } from "../../../cn/core-constants";
import { SourceLoadHandler } from "../SourceLoadHandler";
import { renderImage } from "../../../cm/renderImage";
import { renderVideo } from "../../../cm/renderVideo";
import { renderYoutube } from "../../../cm/renderYoutube";
import { renderCustom } from "../../../cm/renderCustom";
import { renderInvalid } from "../../../cm/renderInvalid";

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
                renderFunction = renderImage;
                break;
            case VIDEO_TYPE:
                renderFunction = renderVideo;
                break;
            case YOUTUBE_TYPE:
                renderFunction = renderYoutube;
                break;
            case CUSTOM_TYPE:
                renderFunction = renderCustom;
                break;
            default:
                renderFunction = renderInvalid;
                break;
        }

        sourcesRenderFunctions[i] = () => renderFunction(fsLightbox, i);
        sourceDisplayFacade.displaySourcesWhichShouldBeDisplayed();
    };
}
