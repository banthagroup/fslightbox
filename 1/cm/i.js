import { SOURCE_CLASS_NAME } from "../cn/classes-names";
import { setUpSourceClassName } from "../h/source/setUpSourceClassName";
import { setUpSourceCustomAttributes } from "../h/source/setUpSourceCustomAttributes";

export function i(fsLightbox, j) {
    const {
        collections: { sourceLoadHandlers },
        elements: { sources: sourcesElements, sourceAnimationWrappers },
        props: { sources }
    } = fsLightbox;

    sourcesElements[j] = document.createElement('img');
    setUpSourceClassName(fsLightbox, j, SOURCE_CLASS_NAME);
    sourcesElements[j].src = sources[j];
    sourcesElements[j].onload = sourceLoadHandlers[j].handleImageLoad;
    setUpSourceCustomAttributes(fsLightbox, j);
    sourceAnimationWrappers[j].appendChild(sourcesElements[j]);
}
