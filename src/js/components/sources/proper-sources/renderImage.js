import { SOURCE_CLASS_NAME } from "../../../constants/classes-names";

export function renderImage(
    {
        collections: { sourcesLoadsHandlers },
        elements: { sources: sourcesElements, sourcesInners },
        props: { sources }
    }, i
) {
    sourcesElements[i] = document.createElement('img');
    sourcesElements[i].className = SOURCE_CLASS_NAME;
    sourcesElements[i].src = sources[i];
    sourcesElements[i].onload = sourcesLoadsHandlers[i].handleImageLoad;
    sourcesInners[i].appendChild(sourcesElements[i]);
}
