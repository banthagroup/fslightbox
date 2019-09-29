import { SOURCE_CLASS_NAME } from "../../../constants/classes-names";

export function renderVideo(
    {
        collections: { sourcesLoadsHandlers },
        elements: { sources: sourcesElements, sourcesInners },
        props
    }, i
) {
    const { sources } = props;

    sourcesElements[i] = document.createElement('video');
    sourcesElements[i].className = SOURCE_CLASS_NAME;
    sourcesElements[i].src = sources[i];
    sourcesElements[i].onloadedmetadata = sourcesLoadsHandlers[i].handleVideoLoad;
    sourcesElements[i].controls = true;
    if (props.videosPosters[i]) {
        sourcesElements[i].poster = props.videosPosters[i];
    }

    const source = document.createElement('source');
    source.src = sources[i];
    sourcesElements[i].appendChild(source);

    sourcesInners[i].appendChild(sourcesElements[i]);
}
