import { SOURCE_CLASS_NAME } from "../../../constants/classes-names";
import { setUpSourceClassName } from "../../../helpers/source/setUpSourceClassName";

export function renderCustom(fsLightbox, i) {
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
