import { PREFIX, SOURCE_CLASS_NAME } from "../../../constants/classes-names";

export function renderYoutube(
    {
        collections: { sourcesLoadsHandlers },
        elements: { sources: sourcesElements, sourcesInners },
        props: { sources }
    }, i
) {
    sourcesElements[i] = document.createElement('iframe');
    sourcesElements[i].className = `${ SOURCE_CLASS_NAME } ${ PREFIX }youtube-iframe`;
    sourcesElements[i].src = `https://www.youtube.com/embed/${ getYoutubeVideoIdFromUrl(sources[i]) }`;
    sourcesElements[i].allowFullscreen = true;
    sourcesInners[i].appendChild(sourcesElements[i]);
    sourcesLoadsHandlers[i].handleMaxDimensionsSourceLoad();

    function getYoutubeVideoIdFromUrl(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        return url.match(regExp)[2];
    }
}
