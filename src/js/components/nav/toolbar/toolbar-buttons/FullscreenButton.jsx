import React, { useState } from 'react';
import ToolbarButton from "../ToolbarButton.jsx";

function FullscreenButton(
    {
        fsLightbox: {
            componentsStates: { toolbarButtons: { fullscreen: isFullscreenOpenState } },
            core: { fullscreenToggler: { enterFullscreen, exitFullscreen } }
        }
    }
) {
    let isFullscreenOpenAtStart = false;
    if (typeof window !== 'undefined') {
        isFullscreenOpenAtStart = !!document.fullscreenElement;
    }

    const [isFullscreenOpen, setIsFullscreenOpen] = useState(isFullscreenOpenAtStart);
    isFullscreenOpenState.get = () => isFullscreenOpen;
    isFullscreenOpenState.set = setIsFullscreenOpen;

    const fullscreen = () => {
        (isFullscreenOpen) ?
            exitFullscreen() :
            enterFullscreen();
    };

    return (
        <ToolbarButton
            onClick={ fullscreen }
            viewBox={ (isFullscreenOpen) ? "0 0 950 1024" : "0 0 18 18" }
            size={ (isFullscreenOpen) ? "24px" : "20px" }
            d={ (isFullscreenOpen) ?
                "M682 342h128v84h-212v-212h84v128zM598 810v-212h212v84h-128v128h-84zM342 342v-128h84v212h-212v-84h128zM214 682v-84h212v212h-84v-128h-128z" :
                "M4.5 11H3v4h4v-1.5H4.5V11zM3 7h1.5V4.5H7V3H3v4zm10.5 6.5H11V15h4v-4h-1.5v2.5zM11 3v1.5h2.5V7H15V3h-4z"
            }
            title={ (isFullscreenOpen) ? "Enter fullscreen" : "Exit fullscreen" }
        />
    );
}

export default FullscreenButton;
