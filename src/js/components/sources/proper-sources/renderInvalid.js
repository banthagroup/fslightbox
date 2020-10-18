import { FADE_IN_STRONG_CLASS_NAME, FLEX_CENTERED_CLASS_NAME, PREFIX } from "../../../constants/classes-names";

export function renderInvalid(
    {
        elements: { sources: sourcesElements, sourceAnimationWrappers, sourceMainWrappers },
        props: { sources }
    }, i
) {
    sourcesElements[i] = document.createElement('div');
    sourcesElements[i].className = `${ PREFIX }invalid-file-wrapper ${ FLEX_CENTERED_CLASS_NAME }`;
    sourcesElements[i].innerHTML = 'Invalid source';

    sourceAnimationWrappers[i].classList.add(FADE_IN_STRONG_CLASS_NAME);

    sourceAnimationWrappers[i].appendChild(sourcesElements[i]);

    // remove loader
    sourceMainWrappers[i].removeChild(sourceMainWrappers[i].firstChild);
}
