import { ca } from "../h/ca";

export function i(o, j) {
    var {
        collections: { sourceLoadHandlers },
        elements: { sources: s },
        props: { sources },
	saw
    } = o;

    s[j] = document.createElement("img");
    s[j].className = "fslightboxs";
    s[j].src = sources[j];
    s[j].onload = sourceLoadHandlers[j].handleImageLoad;
    ca(o, j);
    saw[j].appendChild(s[j]);
}
