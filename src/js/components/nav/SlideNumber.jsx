import React, { useState } from 'react';

const SlideNumber = (
    {
        fsLightbox: {
            componentsStates: {
                slideNumberUpdater: slideNumberUpdaterState
            },
            data: { sourcesCount },
            stageIndexes
        }
    }
) => {
    const [currentSlideNumberUpdaterValue, setSlideNumberUpdaterValue] = useState(false);
    slideNumberUpdaterState.get = () => currentSlideNumberUpdaterValue;
    slideNumberUpdaterState.set = setSlideNumberUpdaterValue;

    return (
        <div className="fslightbox-slide-number-container fslightbox-flex-centered">
            <div>{ stageIndexes.current + 1 }</div>
            <div className="fslightbox-slash">/</div>
            <div>{ sourcesCount }</div>
        </div>
    );
};
export default SlideNumber;
