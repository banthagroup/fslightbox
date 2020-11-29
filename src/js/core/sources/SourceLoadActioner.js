import { SourceSizer } from "./SourceSizer";
import { FADE_IN_STRONG_CLASS_NAME, OPACITY_1_CLASS_NAME } from "../../constants/classes-names";

export function SourceLoadActioner(
    {
        collections: { sourceSizers },
        elements: { sources, sourceAnimationWrappers, sourceMainWrappers },
        resolve
    }, i, defaultWidth, defaultHeight
) {
    this.runActions = () => {
        sources[i].classList.add(OPACITY_1_CLASS_NAME);
        sourceAnimationWrappers[i].classList.add(FADE_IN_STRONG_CLASS_NAME);
        sourceMainWrappers[i].removeChild(sourceMainWrappers[i].firstChild);
        sourceSizers[i] = resolve(SourceSizer, [i, defaultWidth, defaultHeight]);
        sourceSizers[i].adjustSize();
    };
}
