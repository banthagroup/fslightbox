import { CUSTOM_TYPE, IMAGE_TYPE, INVALID_TYPE, VIDEO_TYPE, YOUTUBE_TYPE } from "../../../constants/core-constants";
import { SourceLoadHandler } from "../SourceLoadHandler";
import { renderImage } from "../../../components/sources/proper-sources/renderImage";
import { renderVideo } from "../../../components/sources/proper-sources/renderVideo";
import { renderYoutube } from "../../../components/sources/proper-sources/renderYoutube";
import { renderCustom } from "../../../components/sources/proper-sources/renderCustom";
import { renderInvalid } from "../../../components/sources/proper-sources/renderInvalid";

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
