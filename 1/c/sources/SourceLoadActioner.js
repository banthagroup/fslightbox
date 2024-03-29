import { SourceSizer } from "./SourceSizer";
import { FADE_IN_STRONG_CLASS_NAME, OPACITY_1_CLASS_NAME } from "../../cn/classes-names";

export function SourceLoadActioner(
    {
        collections: { sourceSizers },
        elements: { sourceAnimationWrappers, sources },
	isl,
        resolve
    }, i
) {
    this.runActions = (defaultWidth, defaultHeight) => {
	isl[i]=true;
        sources[i].classList.add(OPACITY_1_CLASS_NAME);
        sourceAnimationWrappers[i].classList.add(FADE_IN_STRONG_CLASS_NAME);
        sourceAnimationWrappers[i]
		.removeChild(sourceAnimationWrappers[i].firstChild);

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
