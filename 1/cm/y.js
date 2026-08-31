import { ca } from "../h/ca";

export function y(o, i) {
    var {
	ap,
        collections: { sourceLoadHandlers },
        elements: { sources: se },
        props: { sources },
	saw
    } = o, u = sources[i], p=u.split("?")[1], s=document.createElement("iframe"), r=/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;

    se[i] = s;
    s.className = "fslightboxs fslightboxy";
    s.src = `https://www.youtube.com/embed/${u.match(r)[2]}?${p?p:""}${ap.i(i)?"&mute=1&autoplay=1":""}&enablejsapi=1`;
    s.allowFullscreen = true;
    ca(o, i);
    saw[i].appendChild(s);
    sourceLoadHandlers[i].handleYoutubeLoad()
}
