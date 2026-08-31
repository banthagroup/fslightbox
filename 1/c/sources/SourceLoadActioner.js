import { SourceSizer } from "./SourceSizer";
import { FADE_IN_STRONG_CLASS_NAME, OPACITY_1_CLASS_NAME } from "../../cn/classes-names";

export function SourceLoadActioner(o, i) {
var {
        collections: { sourceSizers },
        elements: { sources },
	isl,
	props: {onSourceLoad},
        resolve,
	saw
    } = o;
    this.b = (defaultWidth, defaultHeight) => {
        sources[i].classList.add(OPACITY_1_CLASS_NAME);
	this.a();
        runNormalLoadActions(defaultWidth, defaultHeight);
        this.b = runNormalLoadActions;
    };
	this.a = () => {
		isl[i]=true;
		saw[i].classList.add(FADE_IN_STRONG_CLASS_NAME);
        	saw[i]
			.removeChild(saw[i].firstChild);
		if (onSourceLoad)
			onSourceLoad(o, sources[i], i);
	}

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
