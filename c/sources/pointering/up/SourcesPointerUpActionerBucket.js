import { TRANSFORM_TRANSITION_CLASS_NAME } from "../../../../cn/classes-names";

export function SourcesPointerUpActionerBucket(
    {
        core: { slideIndexChanger },
        elements: { smw },
        stageIndexes
    }
) {
    this.runPositiveSwipedXActions = () => {
	var i = stageIndexes.previous;
        if (i === undefined) {
            t("z");
        } else {
            t("p");
            slideIndexChanger.changeTo(i);
            t("z");
        }
    };

    this.runNegativeSwipedXActions = () => {
	var i = stageIndexes.next;
        if (i === undefined) {
            t("z");
        } else {
            t("ne");
            slideIndexChanger.changeTo(i);
            t("z");
        }
    };

    function t(p) {
	var w=smw[stageIndexes.current];
	w.a();
        w[p]();
    }
}
