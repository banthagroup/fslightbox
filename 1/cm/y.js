import { PREFIX, SOURCE_CLASS_NAME } from "../cn/classes-names";
import { setUpSourceClassName } from "../h/source/setUpSourceClassName";
import { setUpSourceCustomAttributes } from "../h/source/setUpSourceCustomAttributes";

export function y(fsLightbox, i) {
    var {
	ap,
        collections: { sourceLoadHandlers },
        elements: { sources: sourcesElements, sourceAnimationWrappers },
        props: { sources }
    } = fsLightbox, u = sources[i], p=u.split("?")[1], s=document.createElement("iframe"), r=/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;

    sourcesElements[i] = s;
    setUpSourceClassName(fsLightbox, i, `${SOURCE_CLASS_NAME} ${PREFIX}youtube-iframe`);
    s.src = `https://www.youtube.com/embed/${u.match(r)[2]}?${p?p:""}&mute=1&autoplay=${ap.i(i)}&enablejsapi=1`;
    s.allowFullscreen = true;
    setUpSourceCustomAttributes(fsLightbox, i);
    sourceAnimationWrappers[i].appendChild(s);
    sourceLoadHandlers[i].handleYoutubeLoad();
}
