import { SourcesPointerMoveActioner } from "./SourcesPointerMoveActioner";

export function SourcesPointerMove({ props: { sources }, resolve, sourcePointerProps }) {
    const sourcesPointerMoveActioner = resolve(SourcesPointerMoveActioner);

    (sources.length === 1) ?
        this.listener = () => {
            // if there is only one slide we need to simulate swipe to prevent lightbox from closing
            sourcePointerProps.swipedX = 1;
        } :
        this.listener = (e) => {
            if (sourcePointerProps.isPointering) {
                sourcesPointerMoveActioner.runActionsForEvent(e);
            }
        };
}
