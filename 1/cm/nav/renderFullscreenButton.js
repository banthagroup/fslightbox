import { svg } from "../svg";
import { renderAndGetToolbarButton } from "./renderAndGetToolbarButton";
import{PREFIX}from"../../cn/classes-names.js"

export function renderFullscreenButton(o,p) {
if(o.hfs)return;
    const enterViewBox = '0 0 18 18';
    const enterD = 'M4.5 11H3v4h4v-1.5H4.5V11zM3 7h1.5V4.5H7V3H3v4zm10.5 6.5H11V15h4v-4h-1.5v2.5zM11 3v1.5h2.5V7H15V3h-4z';

    const exitViewBox = '0 0 950 1024';
    const exitD = 'M682 342h128v84h-212v-212h84v128zM598 810v-212h212v84h-128v128h-84zM342 342v-128h84v212h-212v-84h128zM214 682v-84h212v212h-84v-128h-128z';

    const fullscreenButton = renderAndGetToolbarButton(p);
    fullscreenButton.title = 'Enter fullscreen';
    var s = svg(fullscreenButton, enterViewBox, enterD);

    o.fso = () => {
        o.ifs = 1;
        fullscreenButton.title = 'Exit fullscreen';
	s.classList.add(`${PREFIX}fsx`);
        s.setAttributeNS(null, 'viewBox', exitViewBox);
        s.firstChild.setAttributeNS(null, 'd', exitD);
    };

    o.fsx = () => {
        o.ifs = 0;
        fullscreenButton.title = 'Enter fullscreen';
	s.classList.remove(`${PREFIX}fsx`);
        s.setAttributeNS(null, 'viewBox', enterViewBox);
        s.firstChild.setAttributeNS(null, 'd', enterD);
    };

    fullscreenButton.onclick = o.fs.t;
}
