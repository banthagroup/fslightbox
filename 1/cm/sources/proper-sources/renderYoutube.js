import { PREFIX, SOURCE_CLASS_NAME } from "../../../cn/classes-names";
import { setUpSourceClassName } from "../../../h/source/setUpSourceClassName";
import { setUpSourceCustomAttributes } from "../../../h/source/setUpSourceCustomAttributes";

export function renderYoutube(fsLightbox, i) {
    const {
        collections: { sourceLoadHandlers },
        elements: { sources: sourcesElements, sourceAnimationWrappers },
        props: { sources }
    } = fsLightbox;

    sourcesElements[i] = document.createElement("iframe");
    setUpSourceClassName(fsLightbox, i, `${SOURCE_CLASS_NAME} ${PREFIX}youtube-iframe`);
    var url = sources[i];
    var p = url.split("?")[1];
    sourcesElements[i].src = `https://www.youtube.com/embed/${getYoutubeVideoIdFromUrl()}?${p ? p : ""}`;
    sourcesElements[i].allowFullscreen = true;
    setUpSourceCustomAttributes(fsLightbox, i);
    sourceAnimationWrappers[i].appendChild(sourcesElements[i]);
    sourceLoadHandlers[i].handleYoutubeLoad();

    function getYoutubeVideoIdFromUrl() {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        return url.match(regExp)[2];
    }
}
