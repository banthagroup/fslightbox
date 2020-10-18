import { SOURCE_CLASS_NAME } from "../../../constants/classes-names";
import { setUpSourceClassName } from "../../../helpers/source/setUpSourceClassName";
import { setUpSourceCustomAttributes } from "../../../helpers/source/setUpSourceCustomAttributes";

export function renderImage(fsLightbox, i) {
    const {
        collections: { sourcesLoadsHandlers },
        elements: { sources: sourcesElements, sourceAnimationWrappers },
        props: { sources }
    } = fsLightbox;

    sourcesElements[i] = document.createElement('img');
    setUpSourceClassName(fsLightbox, i, SOURCE_CLASS_NAME);
    sourcesElements[i].src = sources[i];
    sourcesElements[i].onload = sourcesLoadsHandlers[i].handleImageLoad;
    setUpSourceCustomAttributes(fsLightbox, i);
    sourceAnimationWrappers[i].appendChild(sourcesElements[i]);
}
