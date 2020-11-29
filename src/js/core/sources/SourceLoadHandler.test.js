import { SourceLoadActioner } from "./SourceLoadActioner";
import { SourceLoadHandler } from "./SourceLoadHandler";

const fsLightbox = {
    elements: { sources: [{ offsetWidth: 111, offsetHeight: 222 }] },
    props: {},
    resolve: (constructor, params) => {
        if (constructor === SourceLoadActioner) {
            expect(expectedSourceLoadActionerParams).toEqual(params);
            return sourceLoadActioner;
        } else {
            throw new Error('Invalid dependency resolved');
        }
    }
};
let expectedSourceLoadActionerParams;
const sourceLoadActioner = { runActions: null };
let sourceLoadHandler;

beforeEach(() => {
    sourceLoadHandler = new SourceLoadHandler(fsLightbox, 0);
    sourceLoadActioner.runActions = jest.fn();
});

test('handleImageLoad', () => {
    expectedSourceLoadActionerParams = [0, 1000, 500];
    sourceLoadHandler.handleImageLoad({ target: { width: 1000, height: 500 } });
    expect(sourceLoadActioner.runActions).toBeCalled();
});

test('handleVideoLoad', () => {
    expectedSourceLoadActionerParams = [0, 2000, 1000];
    sourceLoadHandler.handleVideoLoad({ target: { videoWidth: 2000, videoHeight: 1000 } });
    expect(sourceLoadActioner.runActions).toBeCalled();
});

test('handleNotMetaDatedVideoLoad', () => {
    expectedSourceLoadActionerParams = [0, 2000, 1000];

    let tempYoutubeLoad = sourceLoadHandler.handleYoutubeLoad;
    sourceLoadHandler.handleYoutubeLoad = jest.fn();

    sourceLoadHandler.handleNotMetaDatedVideoLoad();
    expect(sourceLoadHandler.handleYoutubeLoad).toBeCalled();

    sourceLoadHandler.handleVideoLoad({ target: { videoWidth: 2000, videoHeight: 1000 } });
    sourceLoadHandler.handleNotMetaDatedVideoLoad();
    expect(sourceLoadHandler.handleYoutubeLoad).toBeCalledTimes(1);

    sourceLoadHandler.handleYoutubeLoad = tempYoutubeLoad;
});

test('handleYoutubeLoad', () => {
    expectedSourceLoadActionerParams = [0, 1920, 1080];
    sourceLoadHandler.handleYoutubeLoad();
    expect(sourceLoadActioner.runActions).toBeCalled();

    expectedSourceLoadActionerParams = [0, 111, 222];
    fsLightbox.props.maxYoutubeDimensions = { width: 111, height: 222 };
    sourceLoadHandler = new SourceLoadHandler(fsLightbox, 0);
    sourceLoadHandler.handleYoutubeLoad();
});

test('handleCustomLoad', () => {
    window.setTimeout = (callback) => callback();
    expectedSourceLoadActionerParams = [0, 111, 222];
    sourceLoadHandler.handleCustomLoad();
    expect(sourceLoadActioner.runActions).toBeCalled();
});
