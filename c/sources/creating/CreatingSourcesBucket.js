import { AutomaticTypeDetector } from "../types/AutomaticTypeDetector";

export function CreatingSourcesBucket(
    {
        props: { types, type, sources }, resolve,
    }, localStorageManager, detectedTypeActioner
) {
    this.getTypeSetByClientForIndex = (i) => {
        let typeSetManuallyByClient;

        if (types && types[i]) {
            typeSetManuallyByClient = types[i];
        } else if (type) {
            typeSetManuallyByClient = type;
        }

        return typeSetManuallyByClient;
    };

    this.retrieveTypeWithXhrForIndex = (i) => {
        // we need to copy index because xhr will for sure come later than next loop iteration
        const automaticTypeDetector = resolve(AutomaticTypeDetector);
        automaticTypeDetector.setUrlToCheck(sources[i]);
        automaticTypeDetector.getSourceType((sourceType) => {
            localStorageManager.handleReceivedSourceTypeForUrl(sourceType, sources[i]);
            detectedTypeActioner.runActionsForSourceTypeAndIndex(sourceType, i)
        });
    };
}
