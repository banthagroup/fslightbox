import { FADE_IN_STRONG_CLASS_NAME, FLEX_CENTERED_CLASS_NAME, PREFIX } from "../cn/classes-names";

export function in(
    {
        elements: { sources: sourcesElements, sourceAnimationWrappers },
        props: { sources }
    }, i
) {
    sourcesElements[i] = document.createElement('div');
    sourcesElements[i].className = `${PREFIX}invalid-file-wrapper ${FLEX_CENTERED_CLASS_NAME}`;
    sourcesElements[i].innerHTML = 'Invalid source';

    sourceAnimationWrappers[i].classList.add(FADE_IN_STRONG_CLASS_NAME);

    sourceAnimationWrappers[i].removeChild(sourceAnimationWrappers[i].firstChild);

    sourceAnimationWrappers[i].appendChild(sourcesElements[i]);
}
