import { IMAGE_TYPE, INVALID_TYPE, VIDEO_TYPE, YOUTUBE_TYPE } from "../../../constants/core-constants";
import { AutomaticTypeDetector } from "./AutomaticTypeDetector";
import { TEST_IMAGE_URL, TEST_VIDEO_URL, TEST_YOUTUBE_URL } from "../../../../../tests/__tests-services__/testVars";

const fsLightbox = {
    collections: {
        xhrs: [],
    }
};

/** @var { AutomaticTypeDetector } automaticTypeDetector */
const automaticTypeDetector = new AutomaticTypeDetector(fsLightbox);

function MockXhr() {
    this.open = () => {};
    this.send = () => {};
}

test('adding xhr to xhrs array', () => {
    const tempXhr = window.XMLHttpRequest;
    window.XMLHttpRequest = MockXhr;

    automaticTypeDetector.setUrlToCheck('invalid-url');
    automaticTypeDetector.getSourceType();
    expect(fsLightbox.collections.xhrs[0]).toBeInstanceOf(MockXhr);

    window.XMLHttpRequest = tempXhr;
});

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
        automaticTypeDetector.setUrlToCheck('https://cors-anywhere.herokuapp.com/');
        return automaticTypeDetector.getSourceType((sourceType) => {
            expect(sourceType).toEqual(INVALID_TYPE);
            testDone();
        });
    });
});


