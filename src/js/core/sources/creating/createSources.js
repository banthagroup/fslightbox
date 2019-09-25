import { CreatingSourcesLocalStorageManager } from "./CreatingSourcesLocalStorageManager";
import { DetectedTypeActioner } from "../types/DetectedTypeActioner";
import { CreatingSourcesBucket } from "./CreatingSourcesBucket";
import { CUSTOM_TYPE } from "../../../constants/core-constants";

export function createSources({ data: { sourcesCount }, props: { sources }, resolve }) {
    const localStorageManager = resolve(CreatingSourcesLocalStorageManager);
    const detectedTypeActioner = resolve(DetectedTypeActioner);
    const creatingSourcesBucket = resolve(CreatingSourcesBucket, [localStorageManager, detectedTypeActioner]);

    for (let i = 0; i < sourcesCount; i++) {
        if (typeof sources[i] !== "string") {
            detectedTypeActioner.runActionsForSourceTypeAndIndex(CUSTOM_TYPE, i);
            continue;
        }

        const typeSetManuallyByClient = creatingSourcesBucket.getTypeSetByClientForIndex(i);
        if (typeSetManuallyByClient) {
            detectedTypeActioner.runActionsForSourceTypeAndIndex(typeSetManuallyByClient, i);
            continue;
        }

        const sourceTypeRetrievedWithoutXhr = localStorageManager.getSourceTypeFromLocalStorageByUrl(sources[i]);
        (sourceTypeRetrievedWithoutXhr) ?
            detectedTypeActioner.runActionsForSourceTypeAndIndex(sourceTypeRetrievedWithoutXhr, i) :
            creatingSourcesBucket.retrieveTypeWithXhrForIndex(i);
    }
}
