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
const sourceLoadActioner = { runInitialLoadActions: jest.fn(), runNormalLoadActions: jest.fn() };
let sourceLoadHandler;

beforeEach(() => {
    sourceLoadHandler = new SourceLoadHandler(fsLightbox, 0);
    sourceLoadActioner.runInitialLoadActions = jest.fn();
    sourceLoadActioner.runNormalLoadActions = jest.fn();
});

test('handleImageLoad', () => {
    expectedSourceLoadActionerParams = [0, 1000, 500];
    sourceLoadHandler.handleImageLoad({ target: { width: 1000, height: 500 } });
    expect(sourceLoadActioner.runInitialLoadActions).toBeCalled();
    expect(sourceLoadHandler.handleImageLoad).toBe(sourceLoadActioner.runNormalLoadActions);
});

test('handleVideoLoad', () => {
    expectedSourceLoadActionerParams = [0, 2000, 1000];
    sourceLoadHandler.handleVideoLoad({ target: { videoWidth: 2000, videoHeight: 1000 } });
    expect(sourceLoadActioner.runInitialLoadActions).toBeCalled();
    expect(sourceLoadHandler.handleVideoLoad).toBe(sourceLoadActioner.runNormalLoadActions);
});

test('handleYoutubeLoad', () => {
    expectedSourceLoadActionerParams = [0, 1920, 1080];
    sourceLoadHandler.handleYoutubeLoad();
    expect(sourceLoadActioner.runInitialLoadActions).toBeCalled();
    expect(sourceLoadHandler.handleYoutubeLoad).toBe(sourceLoadActioner.runNormalLoadActions);

    expectedSourceLoadActionerParams = [0, 111, 222];
    fsLightbox.props.maxYoutubeDimensions = { width: 111, height: 222 };
    sourceLoadHandler = new SourceLoadHandler(fsLightbox, 0);
    sourceLoadHandler.handleYoutubeLoad();
});

test('handleCustomLoad', () => {
    window.setTimeout = (callback) => callback();
    expectedSourceLoadActionerParams = [0, 111, 222];
    sourceLoadHandler.handleCustomLoad();
    expect(sourceLoadHandler.handleCustomLoad).toBe(sourceLoadActioner.runNormalLoadActions);
});
