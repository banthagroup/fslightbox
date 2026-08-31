import { FADE_IN_STRONG_CLASS_NAME, FLEX_CENTERED_CLASS_NAME, PREFIX } from "../cn/classes-names";import{SourceLoadActioner} from"../c/sources/SourceLoadActioner";

export function inv(
    o, i
) {var {
        elements: { sources: s },
        props: { sources },
	saw
    } = o;
    s[i] = document.createElement('div');
    s[i].className = `${PREFIX}invalid-file-wrapper ${FLEX_CENTERED_CLASS_NAME}`;
    s[i].innerHTML = 'Invalid source';
    saw[i].appendChild(s[i]);new SourceLoadActioner(o, i).a();
}
