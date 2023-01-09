import {
    IMAGE_TYPE,
    INVALID_TYPE,
    VIDEO_TYPE,
    YOUTUBE_TYPE,
} from "../../../constants/core-constants";
import { getAutomaticTypeDetectorBucket } from "./getAutomaticTypeDetectorBucket";

export function AutomaticTypeDetector() {
    const automaticTypeDetectorBucket = getAutomaticTypeDetectorBucket();

    let url;
    let resolveSourceType;
    let xhr;

    this.setUrlToCheck = (urlToCheck) => {
        url = urlToCheck;
    };

    /**
     * Asynchronous method takes callback which will be called after source type is received with source type as param.
     * @param {Function} callback
     */
    this.getSourceType = (callback) => {
        if (automaticTypeDetectorBucket.isUrlYoutubeOne(url)) {
            return callback(YOUTUBE_TYPE);
        }
        resolveSourceType = callback;
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = onRequestStateChange;
        xhr.open('GET', url, true);
        xhr.send();
    };

    function onRequestStateChange() {
        // If state 4 is executed without state 2 - request has failed (most likely by CORS) so need to resolve invalid type.
        // No need to abort request because it is already finished.
        if (xhr.readyState === 4) {
            resolveSourceType(INVALID_TYPE);
            return;
        }

        if (xhr.readyState !== 2) {
            return;
        }

        const headerType = automaticTypeDetectorBucket.getTypeFromResponseContentType(
            xhr.getResponseHeader('content-type')
        );

        let finalType;
        switch (headerType) {
            case 'image':
                finalType = IMAGE_TYPE;
                break;
            case 'video':
                finalType = VIDEO_TYPE;
                break;
            default:
                finalType = INVALID_TYPE;
        }

        // Need to reset onreadystatechange because after xhr.abort() if request is sent (xhr.send())
        // xhr will call onreadystatechange with readyState 4: https://xhr.spec.whatwg.org/#the-abort()-method
        xhr.onreadystatechange = null;
        xhr.abort();

        resolveSourceType(finalType);
    }
}
