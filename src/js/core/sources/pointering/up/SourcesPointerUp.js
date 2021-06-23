import { SourcesPointerUpActioner } from "./SourcesPointerUpActioner";

export function SourcesPointerUp({ resolve, sourcePointerProps }) {
    const sourcesPointerUpActioner = resolve(SourcesPointerUpActioner);

    this.listener = () => {
        if (sourcePointerProps.isPointering) {
            (sourcePointerProps.swipedX) ?
                sourcesPointerUpActioner.runActions() :
                sourcesPointerUpActioner.runNoSwipeActions();
        }
    };
}
