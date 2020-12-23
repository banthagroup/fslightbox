import { SourceLoadActioner } from "./SourceLoadActioner";
import { SourceLoadHandler } from "./SourceLoadHandler";

const fsLightbox = {
    elements: { sources: [{ offsetWidth: 123, offsetHeight: 456 }] },
    props: {},
    resolve: (constructor, params) => {
        if (constructor === SourceLoadActioner) {
            expect(params[0]).toEqual(0);
            return sourceLoadActioner;
        } else {
            throw new Error('Invalid dependency resolved');
        }
    }
};
const sourceLoadActioner = { runActions: null };
const sourceLoadHandler = new SourceLoadHandler(fsLightbox, 0);

beforeEach(() => {
    sourceLoadActioner.runActions = jest.fn();
});

test('handleNotMetaDatedVideoLoad', () => {
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
    sourceLoadHandler.handleYoutubeLoad();
    expect(sourceLoadActioner.runActions).toBeCalledWith(1920, 1080);

    fsLightbox.props.maxYoutubeDimensions = { width: 111, height: 222 };
    sourceLoadHandler.handleYoutubeLoad();
    expect(sourceLoadActioner.runActions).toBeCalledWith(111, 222);
});

test('handleCustomLoad', () => {
    window.setTimeout = (callback) => callback();
    sourceLoadHandler.handleCustomLoad();
    expect(sourceLoadActioner.runActions).toBeCalledWith(123, 456);
});
