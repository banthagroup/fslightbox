import { removeFromElementClassIfContains } from "../../helpers/elements/removeFromElementClassIfContains";
import { TRANSFORM_TRANSITION_CLASS_NAME } from "../../constants/classes-names";

export function setUpWindowResizeActioner(
    {
        collections: { sourcesOutersTransformers, sourcesStylers },
        core: { windowResizeActioner: self },
        data,
        elements: { sourcesOuters },
        props,
        stageIndexes
    }
) {
    self.runActions = () => {
        // decreasing max source dimensions for better UX
        (innerWidth < 992) ?
            data.maxSourceWidth = innerWidth :
            data.maxSourceWidth = 0.9 * innerWidth;
        data.maxSourceHeight = 0.9 * innerHeight;

        for (let i = 0; i < props.sources.length; i++) {
            removeFromElementClassIfContains(sourcesOuters[i], TRANSFORM_TRANSITION_CLASS_NAME);

            if (i !== stageIndexes.current) {
                sourcesOutersTransformers[i].negative();
            }

            // if source is Invalid or if lightbox is initialized there are no sourcesStylers
            // so we need to check if it exists
            if (sourcesStylers[i]) {
                sourcesStylers[i].styleSize();
            }
        }
    };
}
