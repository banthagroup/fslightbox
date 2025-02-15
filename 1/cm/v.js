import { SOURCE_CLASS_NAME } from "../cn/classes-names";
import { setUpSourceClassName } from "../h/source/setUpSourceClassName";
import { setUpSourceCustomAttributes } from "../h/source/setUpSourceCustomAttributes";

export function v(fsLightbox, i) {
    var {
	ap,
        collections: { sourceLoadHandlers },
        elements: { sources: sourcesElements, sourceAnimationWrappers },
        props: { sources, videosPosters }
    } = fsLightbox, v=document.createElement('video'), s=document.createElement('source');sourcesElements[i]=v;

    setUpSourceClassName(fsLightbox, i, SOURCE_CLASS_NAME)
    v.src = sources[i];
    v.onloadedmetadata = (e) => sourceLoadHandlers[i].handleVideoLoad(e);
    v.controls = true;v.autoplay=ap.i(i);
    
    setUpSourceCustomAttributes(fsLightbox, i);
    if (videosPosters[i]) {
        sourcesElements[i].poster = videosPosters[i];
    }

    s.src = sources[i];
    v.appendChild(s);

    setTimeout(sourceLoadHandlers[i].handleNotMetaDatedVideoLoad, 3000);

    sourceAnimationWrappers[i].appendChild(sourcesElements[i])
}
