import { PREFIX, SOURCE_CLASS_NAME } from "../../../constants/classes-names";
import { setUpSourceClassName } from "../../../helpers/source/setUpSourceClassName";
import { setUpSourceCustomAttributes } from "../../../helpers/source/setUpSourceCustomAttributes";

export function renderYoutube(fsLightbox, i) {
    const {
        collections: { sourcesLoadsHandlers },
        elements: { sources: sourcesElements, sourcesInners },
        props: { sources }
    } = fsLightbox;

    sourcesElements[i] = document.createElement('iframe');
    setUpSourceClassName(fsLightbox, i, `${SOURCE_CLASS_NAME} ${PREFIX}youtube-iframe`)
    sourcesElements[i].src = `https://www.youtube.com/embed/${getYoutubeVideoIdFromUrl(sources[i])}`;
    sourcesElements[i].allowFullscreen = true;
    setUpSourceCustomAttributes(fsLightbox, i);
    sourcesInners[i].appendChild(sourcesElements[i]);
    sourcesLoadsHandlers[i].handleYoutubeLoad();

    function getYoutubeVideoIdFromUrl(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        return url.match(regExp)[2];
    }
}
