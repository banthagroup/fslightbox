import { SOURCE_CLASS_NAME } from "../../../constants/classes-names";

export function renderVideo(
    {
        collections: { sourcesLoadsHandlers, sourcesStylers },
        elements: { sources: sourcesElements, sourcesInners },
        props
    }, i
) {
    const { sources } = props;

    sourcesElements[i] = document.createElement('video');
    sourcesElements[i].className = SOURCE_CLASS_NAME;
    sourcesElements[i].src = sources[i];
    sourcesElements[i].onloadedmetadata = (e) => {
        sourcesLoadsHandlers[i].handleVideoLoad(e);
    };
    sourcesElements[i].controls = true;
    if (props.videosPosters[i]) {
        sourcesElements[i].poster = props.videosPosters[i];
    }

    const source = document.createElement('source');
    source.src = sources[i];
    sourcesElements[i].appendChild(source);

    setTimeout(() => {
        sourcesLoadsHandlers[i].handleNotMetaDatedVideoLoad();
    }, 3000);

    sourcesInners[i].appendChild(sourcesElements[i]);
}
