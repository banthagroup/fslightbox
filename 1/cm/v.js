import { ca } from "../h/ca";

export function v(o, i) {
    var {
	ap,
        collections: { sourceLoadHandlers },
        elements: { sources: se },
        props: { sources, videosPosters },
	saw
    } = o, v=document.createElement('video'), s=document.createElement('source');se[i]=v;

    v.className = "fslightboxs fslightboxv";
    v.src = sources[i];
    v.onloadedmetadata = (e) => sourceLoadHandlers[i].handleVideoLoad(e);
    v.controls = true;v.autoplay=ap.i(i);
    
    ca(o, i);

    s.src = sources[i];
    v.appendChild(s);

    setTimeout(sourceLoadHandlers[i].handleNotMetaDatedVideoLoad, 3000);

    saw[i].appendChild(v)
}
