import React, { useState } from 'react';
import { ABSOLUTED_CLASS_NAME, FULL_DIMENSION_CLASS_NAME, PREFIX } from "../../constants/classes-names";

// this component enables up event over the youtube video because it hovers it up with bigger z-index
const SlideSwipingHoverer = (
    {
        fsLightbox: { componentsStates: { isSlideSwipingHovererShown: hasMovedWhileSwipingState, } }
    }
) => {
    const [isSlideSwipingHovererShown, setHasMovedWhileSwiping] = useState(false);
    hasMovedWhileSwipingState.get = () => isSlideSwipingHovererShown;
    hasMovedWhileSwipingState.set = setHasMovedWhileSwiping;

    return (isSlideSwipingHovererShown) ?
        <div
            className={ `${ PREFIX }slide-swiping-hoverer ${ FULL_DIMENSION_CLASS_NAME } ${ ABSOLUTED_CLASS_NAME }` } /> :
        null;
};

export default SlideSwipingHoverer;
