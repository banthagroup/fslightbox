import { SourceSizer } from "./SourceSizer";
import { FADE_IN_STRONG_CLASS_NAME, OPACITY_1_CLASS_NAME } from "../../constants/classes-names";

export function SourceLoadActioner(
    {
        collections: { sourceSizers },
        elements: { sourceAnimationWrappers, sourceMainWrappers, sources },
        resolve
    }, i
) {
    this.runActions = (defaultWidth, defaultHeight) => {
        sources[i].classList.add(OPACITY_1_CLASS_NAME);
        sourceAnimationWrappers[i].classList.add(FADE_IN_STRONG_CLASS_NAME);
        sourceMainWrappers[i].removeChild(sourceMainWrappers[i].firstChild);

        runNormalLoadActions(defaultWidth, defaultHeight);
        this.runActions = runNormalLoadActions;
    };

    /**
     * Next loads after initial occur only while using 'srcset' so need to recreate SourceSizer.
     *
     * Note: Reopening lightbox does not trigger image load.
     */
    function runNormalLoadActions(defaultWidth, defaultHeight) {
        sourceSizers[i] = resolve(SourceSizer, [i, defaultWidth, defaultHeight]);
        sourceSizers[i].adjustSize();
    }
}
