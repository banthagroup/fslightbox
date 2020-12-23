import {
    ABSOLUTED_CLASS_NAME,
    FLEX_CENTERED_CLASS_NAME,
    FULL_DIMENSION_CLASS_NAME,
} from "../../constants/classes-names";
import { renderSourceAnimationWrapper } from "./renderSourceAnimationWrapper";

export function renderSourceMainWrapper(fsLightbox, i) {
    const {
        componentsServices: { hideSourceLoaderIfNotYetCollection },
        elements: { sourceWrappersContainer, sourceMainWrappers }
    } = fsLightbox;

    sourceMainWrappers[i] = document.createElement('div');
    sourceMainWrappers[i].className = `${ABSOLUTED_CLASS_NAME} ${FULL_DIMENSION_CLASS_NAME} ${FLEX_CENTERED_CLASS_NAME}`;

    sourceMainWrappers[i].innerHTML = '<div class="fslightbox-loader"><div></div><div></div><div></div><div></div></div>';
    const loader = sourceMainWrappers[i].firstChild;
    hideSourceLoaderIfNotYetCollection[i] = () => {
        if (sourceMainWrappers[i].contains(loader)) {
            sourceMainWrappers[i].removeChild(loader);
        }
    };

    sourceWrappersContainer.appendChild(sourceMainWrappers[i]);

    renderSourceAnimationWrapper(fsLightbox, i);
}
