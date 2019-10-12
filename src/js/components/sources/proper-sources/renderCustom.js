import { SOURCE_CLASS_NAME } from "../../../constants/classes-names";

export function renderCustom(
    {
        collections: { sourcesLoadsHandlers },
        elements: { sources: sourcesElements, sourcesInners },
        props
    }, i
) {
    const { sources } = props;

    sourcesElements[i] = sources[i];

    sourcesElements[i].classList.add(SOURCE_CLASS_NAME);

    if (props.customClasses[i]) {
        sourcesElements[i].classList.add(props.customClasses[i]);
    }

    sourcesInners[i].appendChild(sourcesElements[i]);

    sourcesLoadsHandlers[i].handleCustomLoad();
}
