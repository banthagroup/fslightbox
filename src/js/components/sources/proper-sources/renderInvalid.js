import { FADE_IN_STRONG_CLASS_NAME, FLEX_CENTERED_CLASS_NAME, PREFIX } from "../../../constants/classes-names";

export function renderInvalid(
    {
        elements: { sources: sourcesElements, sourcesInners, sourcesOuters },
        props: { sources }
    }, i
) {
    sourcesElements[i] = document.createElement('div');
    sourcesElements[i].className = `${ PREFIX }invalid-file-wrapper ${ FLEX_CENTERED_CLASS_NAME }`;
    sourcesElements[i].innerHTML = 'Invalid source';

    sourcesInners[i].classList.add(FADE_IN_STRONG_CLASS_NAME);

    sourcesInners[i].appendChild(sourcesElements[i]);

    // remove loader
    sourcesOuters[i].removeChild(sourcesOuters[i].firstChild);
}
