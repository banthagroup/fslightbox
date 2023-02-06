import { SOURCE_CLASS_NAME } from "../cn/classes-names";
import { setUpSourceClassName } from "../h/source/setUpSourceClassName";

export function c(fsLightbox, i) {
    const {
        collections: { sourceLoadHandlers },
        elements: { sources: sourcesElements, sourceAnimationWrappers },
        props: { sources }
    } = fsLightbox;

    sourcesElements[i] = sources[i];
    setUpSourceClassName(fsLightbox, i, `${sourcesElements[i].className} ${SOURCE_CLASS_NAME}`);
    sourceAnimationWrappers[i].appendChild(sourcesElements[i]);
    sourceLoadHandlers[i].handleCustomLoad();
}
