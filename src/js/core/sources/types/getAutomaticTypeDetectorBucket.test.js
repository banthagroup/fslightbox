import { getAutomaticTypeDetectorBucket } from "./getAutomaticTypeDetectorBucket";
import { TEST_YOUTUBE_URL } from "../../../../../tests/__tests-services__/testVars";

const automaticTypeDetectorBucket = getAutomaticTypeDetectorBucket();

test('checking if url is valid youtube url', () => {
    expect(automaticTypeDetectorBucket.isUrlYoutubeOne('ww.youtube.com')).toBeFalsy();
    expect(automaticTypeDetectorBucket.isUrlYoutubeOne(TEST_YOUTUBE_URL)).toBeTruthy();
});

test('getting response content type from response type', () => {
    expect(automaticTypeDetectorBucket.getTypeFromResponseContentType('image/gif'))
        .toEqual('image');
});
