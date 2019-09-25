import {
    IMAGE_TYPE,
    INVALID_TYPE,
    VIDEO_TYPE,
    YOUTUBE_TYPE,
} from "../../../constants/core-constants";
import { getAutomaticTypeDetectorBucket } from "./getAutomaticTypeDetectorBucket";

export function AutomaticTypeDetector({ collections: { xhrs } }) {
    const automaticTypeDetectorBucket = getAutomaticTypeDetectorBucket();

    let url;
    let sourceType;
    let resolveSourceType;
    let xhr;
    let isResolved;

    this.setUrlToCheck = (urlToCheck) => {
        url = urlToCheck;
    };

    /**
     * Asynchronous method takes callback which will be called after source type is received with source type as param.
     * @param { Function } callback
     */
    this.getSourceType = (callback) => {
        if (automaticTypeDetectorBucket.isUrlYoutubeOne(url)) {
            return callback(YOUTUBE_TYPE);
        }
        resolveSourceType = callback;
        xhr = new XMLHttpRequest();
        xhrs.push(xhr);
        xhr.open('GET', url, true);
        xhr.onreadystatechange = onRequestStateChange;
        xhr.send();
    };


    const onRequestStateChange = () => {
        // we need to use isResolved helper because logic after readyState 2 is complex enough that readyState 4 is called
        // before request is aborted
        if (xhr.readyState === 4 && xhr.status === 0 && !isResolved) {
            return resolveInvalidType();
        }
        if (xhr.readyState !== 2) {
            return;
        }
        if (xhr.status !== 200 && xhr.status !== 206) {
            // we are setting isResolved to true so readyState 4 won't be called before forwarding logic
            isResolved = true;
            return resolveInvalidType();
        }
        // we are setting isResolved to true so readyState 4 won't be called before forwarding logic
        isResolved = true;
        setSourceTypeDependingOnResponseContentType(
            automaticTypeDetectorBucket.getTypeFromResponseContentType(
                xhr.getResponseHeader('content-type')
            )
        );
        abortRequestAndResolvePromise();
    };

    const resolveInvalidType = () => {
        sourceType = INVALID_TYPE;
        abortRequestAndResolvePromise();
    };

    const abortRequestAndResolvePromise = () => {
        xhr.abort();
        resolveSourceType(sourceType);
    };

    const setSourceTypeDependingOnResponseContentType = (type) => {
        switch (type) {
            case 'image':
                sourceType = IMAGE_TYPE;
                break;
            case 'video':
                sourceType = VIDEO_TYPE;
                break;
            default:
                sourceType = INVALID_TYPE;
        }
    };
}
