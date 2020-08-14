import { IMAGE_TYPE, INVALID_TYPE, VIDEO_TYPE, YOUTUBE_TYPE } from "../../../constants/core-constants";
import { AutomaticTypeDetector } from "./AutomaticTypeDetector";
import { TEST_IMAGE_URL, TEST_VIDEO_URL, TEST_YOUTUBE_URL } from "../../../../../tests/__tests-services__/testVars";

const automaticTypeDetector = new AutomaticTypeDetector();

describe('calling callback with right sources types', () => {
    test('image type', (testDone) => {
        automaticTypeDetector.setUrlToCheck(TEST_IMAGE_URL);
        return automaticTypeDetector.getSourceType((sourceType) => {
            expect(sourceType).toEqual(IMAGE_TYPE);
            testDone();
        });
    });

    test('video type', (testDone) => {
        automaticTypeDetector.setUrlToCheck(TEST_VIDEO_URL);
        return automaticTypeDetector.getSourceType((sourceType) => {
            expect(sourceType).toEqual(VIDEO_TYPE);
            testDone();
        });
    });

    test('youtube type', (testDone) => {
        automaticTypeDetector.setUrlToCheck(TEST_YOUTUBE_URL);
        return automaticTypeDetector.getSourceType((sourceType) => {
            expect(sourceType).toEqual(YOUTUBE_TYPE);
            testDone();
        });
    });

    test('invalid type', (testDone) => {
        automaticTypeDetector.setUrlToCheck('https://corsproxy.github.io/');
        return automaticTypeDetector.getSourceType((sourceType) => {
            expect(sourceType).toEqual(INVALID_TYPE);
            testDone();
        });
    });
});


