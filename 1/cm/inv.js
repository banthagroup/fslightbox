import { FADE_IN_STRONG_CLASS_NAME, FLEX_CENTERED_CLASS_NAME, PREFIX } from "../cn/classes-names";import{SourceLoadActioner} from"../c/sources/SourceLoadActioner";

export function inv(
    o, i
) {
var {
        elements: { sources: sourcesElements, sourceAnimationWrappers },
        props: { onSourceLoad, sources }
    } = o;
    sourcesElements[i] = document.createElement('div');
    sourcesElements[i].className = `${PREFIX}invalid-file-wrapper ${FLEX_CENTERED_CLASS_NAME}`;
    sourcesElements[i].innerHTML = 'Invalid source';
    sourceAnimationWrappers[i].appendChild(sourcesElements[i]);
	new SourceLoadActioner(o, i).a();
}
