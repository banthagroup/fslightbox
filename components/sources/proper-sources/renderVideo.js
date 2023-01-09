import { SOURCE_CLASS_NAME } from "../../../constants/classes-names";
import { setUpSourceClassName } from "../../../helpers/source/setUpSourceClassName";
import { setUpSourceCustomAttributes } from "../../../helpers/source/setUpSourceCustomAttributes";

export function renderVideo(fsLightbox, i) {
    const {
        collections: { sourceLoadHandlers },
        elements: { sources: sourcesElements, sourceAnimationWrappers },
        props: { sources, videosPosters }
    } = fsLightbox;

    sourcesElements[i] = document.createElement('video');
    setUpSourceClassName(fsLightbox, i, SOURCE_CLASS_NAME)
    sourcesElements[i].src = sources[i];
    sourcesElements[i].onloadedmetadata = (e) => {
        sourceLoadHandlers[i].handleVideoLoad(e);
    };
    sourcesElements[i].controls = true;
    setUpSourceCustomAttributes(fsLightbox, i);
    if (videosPosters[i]) {
        sourcesElements[i].poster = videosPosters[i];
    }

    const source = document.createElement('source');
    source.src = sources[i];
    sourcesElements[i].appendChild(source);

    setTimeout(sourceLoadHandlers[i].handleNotMetaDatedVideoLoad, 3000);

    sourceAnimationWrappers[i].appendChild(sourcesElements[i]);
}
