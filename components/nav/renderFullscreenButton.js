import { renderAndGetSvg } from "../helpers/renderSvg";
import { renderAndGetToolbarButton } from "./renderAndGetToolbarButton";

export function renderFullscreenButton({ componentsServices, core: { fullscreenToggler }, data }, parent) {
    const enterSize = '20px';
    const enterViewBox = '0 0 18 18';
    const enterD = 'M4.5 11H3v4h4v-1.5H4.5V11zM3 7h1.5V4.5H7V3H3v4zm10.5 6.5H11V15h4v-4h-1.5v2.5zM11 3v1.5h2.5V7H15V3h-4z';

    const exitSize = '24px';
    const exitViewBox = '0 0 950 1024';
    const exitD = 'M682 342h128v84h-212v-212h84v128zM598 810v-212h212v84h-128v128h-84zM342 342v-128h84v212h-212v-84h128zM214 682v-84h212v212h-84v-128h-128z';

    const fullscreenButton = renderAndGetToolbarButton(parent);
    fullscreenButton.title = 'Enter fullscreen';
    const svg = renderAndGetSvg(fullscreenButton, enterSize, enterViewBox, enterD);

    componentsServices.enterFullscreen = () => {
        data.isFullscreenOpen = true;
        fullscreenButton.title = 'Exit fullscreen';
        svg.setAttributeNS(null, 'width', exitSize);
        svg.setAttributeNS(null, 'height', exitSize);
        svg.setAttributeNS(null, 'viewBox', exitViewBox);
        svg.firstChild.setAttributeNS(null, 'd', exitD);
    };

    componentsServices.exitFullscreen = () => {
        data.isFullscreenOpen = false;
        fullscreenButton.title = 'Enter fullscreen';
        svg.setAttributeNS(null, 'width', enterSize);
        svg.setAttributeNS(null, 'height', enterSize);
        svg.setAttributeNS(null, 'viewBox', enterViewBox);
        svg.firstChild.setAttributeNS(null, 'd', enterD);
    };

    fullscreenButton.onclick = () => {
        if (data.isFullscreenOpen) {
            fullscreenToggler.exitFullscreen();
        } else {
            fullscreenToggler.enterFullscreen();
        }
    };
}
