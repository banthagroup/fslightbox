import { SOURCE_CLASS_NAME } from "../cn/classes-names";
import { ca } from "../h/ca";

export function c(o, i) {
    var {
        collections: { sourceLoadHandlers },
        elements: { sources: sourcesElements },
        props: { sources },
	saw
    } = o, s = sources[i];

    sourcesElements[i] = s;
    s.classList.add("fslightboxs");
    ca(o, i);
    saw[i].appendChild(s);
    sourceLoadHandlers[i].handleCustomLoad();
}
