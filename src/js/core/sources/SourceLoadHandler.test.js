import { SourceLoadActioner } from "./SourceLoadActioner";
import { SourceLoadHandler } from "./SourceLoadHandler";

const fsLightbox = {
    props: {
        maxYoutubeVideoDimensions: [{ width: 2000, height: 1000 }],
    },
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

test('handleLoad', () => {
    let sourceLoadHandler = new SourceLoadHandler(fsLightbox, 0);
    sourceLoadHandler.setUpLoadForImage();
    expectedSourceLoadActionerParams = [0, 1000, 1500];
    sourceLoadHandler.handleLoad({ target: { width: 1000, height: 1500 } });
    expect(sourceLoadActioner.runInitialLoadActions).toBeCalled();
    expect(sourceLoadActioner.runNormalLoadActions).not.toBeCalled();
    sourceLoadHandler.handleLoad();
    expect(sourceLoadActioner.runInitialLoadActions).toBeCalledTimes(1);
    expect(sourceLoadActioner.runNormalLoadActions).toBeCalled();

    sourceLoadHandler = new SourceLoadHandler(fsLightbox, 0);
    sourceLoadHandler.setUpLoadForVideo();
    expectedSourceLoadActionerParams = [0, 1500, 1000];
    sourceLoadHandler.handleLoad({ target: { videoWidth: 1500, videoHeight: 1000 } });

    sourceLoadHandler = new SourceLoadHandler(fsLightbox, 0);
    sourceLoadHandler.setUpLoadForYoutube();
    expectedSourceLoadActionerParams = [0, 2000, 1000];
    sourceLoadHandler.handleLoad();

    delete fsLightbox.props.maxYoutubeVideoDimensions;
    sourceLoadHandler = new SourceLoadHandler(fsLightbox, 0);
    sourceLoadHandler.setUpLoadForYoutube();
    expectedSourceLoadActionerParams = [0, 1920, 1080];
    sourceLoadHandler.handleLoad();

    sourceLoadHandler = new SourceLoadHandler(fsLightbox, 0);
    expect(sourceLoadHandler.setUpLoadForCustom).toThrowError('You need to set max dimensions of custom sources. Use customSourcesMaxDimensions prop array or customSourcesGlobalMaxDimensions prop object');

    fsLightbox.props.customSourcesGlobalMaxDimensions = { width: 1000, height: 500 };
    sourceLoadHandler = new SourceLoadHandler(fsLightbox, 0);
    sourceLoadHandler.setUpLoadForCustom();
    expectedSourceLoadActionerParams = [0, 1000, 500];
    sourceLoadHandler.handleLoad();

    fsLightbox.props.customSourcesMaxDimensions = [{ width: 3000, height: 1500 }];
    sourceLoadHandler = new SourceLoadHandler(fsLightbox, 0);
    sourceLoadHandler.setUpLoadForCustom();
    expectedSourceLoadActionerParams = [0, 3000, 1500];
    sourceLoadHandler.handleLoad();
});
