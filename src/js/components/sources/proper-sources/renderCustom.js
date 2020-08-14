import { SOURCE_CLASS_NAME } from "../../../constants/classes-names";
import { setUpSourceClassName } from "../../../helpers/source/setUpSourceClassName";

export function renderCustom(fsLightbox, i) {
    const {
        collections: { sourcesLoadsHandlers },
        elements: { sources: sourcesElements, sourcesInners },
        props: { sources }
    } = fsLightbox;

    sourcesElements[i] = sources[i];
    setUpSourceClassName(fsLightbox, i, `${sourcesElements[i].className} ${SOURCE_CLASS_NAME}`);
    sourcesInners[i].appendChild(sourcesElements[i]);
    sourcesLoadsHandlers[i].handleCustomLoad();
}
