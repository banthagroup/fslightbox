import { CUSTOM_TYPE, IMAGE_TYPE, INVALID_TYPE, VIDEO_TYPE, YOUTUBE_TYPE } from "../../../constants/core-constants";
import { SourceLoadHandler } from "../SourceLoadHandler";
import { renderImage } from "../../../components/sources/proper-sources/renderImage";
import { renderVideo } from "../../../components/sources/proper-sources/renderVideo";
import { renderYoutube } from "../../../components/sources/proper-sources/renderYoutube";
import { renderCustom } from "../../../components/sources/proper-sources/renderCustom";
import { renderInvalid } from "../../../components/sources/proper-sources/renderInvalid";

export function DetectedTypeActioner(fsLightbox) {
    const {
        collections: { sourcesLoadsHandlers },
        resolve
    } = fsLightbox;

    this.runActionsForSourceTypeAndIndex = (type, i) => {
        if (type !== INVALID_TYPE) {
            sourcesLoadsHandlers[i] = resolve(SourceLoadHandler, [i]);
        }

        switch (type) {
            case IMAGE_TYPE:
                renderImage(fsLightbox, i);
                break;
            case VIDEO_TYPE:
                renderVideo(fsLightbox, i);
                break;
            case YOUTUBE_TYPE:
                renderYoutube(fsLightbox, i);
                break;
            case CUSTOM_TYPE:
                renderCustom(fsLightbox, i);
                break;
            default:
                renderInvalid(fsLightbox, i);
                break;
        }
    };
}
