import { SourceSizer } from "./SourceSizer";
import { FADE_IN_STRONG_CLASS_NAME, OPACITY_1_CLASS_NAME } from "../../constants/classes-names";

export function SourceLoadActioner(
    {
        collections: { sourcesStylers },
        elements: { sources, sourceAnimationWrappers, sourceMainWrappers },
        resolve
    }, i, defaultWidth, defaultHeight
) {
    this.runNormalLoadActions = () => {
        sources[i].classList.add(OPACITY_1_CLASS_NAME);
        sourceAnimationWrappers[i].classList.add(FADE_IN_STRONG_CLASS_NAME);
        sourceMainWrappers[i].removeChild(sourceMainWrappers[i].firstChild);
    };

    this.runInitialLoadActions = () => {
        this.runNormalLoadActions();
        const sourceStyler = resolve(SourceSizer, [i, defaultWidth, defaultHeight]);
        sourceStyler.adjustSize();
        sourcesStylers[i] = sourceStyler;
    };
}
