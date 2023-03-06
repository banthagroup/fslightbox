import { atd } from "../types/atd";

export function CreatingSourcesBucket(
    {
        props: { types, type, sources },
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
	atd(sources[i],function(t){
	    localStorageManager.handleReceivedSourceTypeForUrl(t, sources[i]);
            detectedTypeActioner.runActionsForSourceTypeAndIndex(t, i)	
	})
    };
}
