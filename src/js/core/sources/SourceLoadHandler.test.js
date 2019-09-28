import { SourceLoadActioner } from "./SourceLoadActioner";
import { SourceLoadHandler } from "./SourceLoadHandler";

const fsLightbox = {
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
let sourceLoadHandler = new SourceLoadHandler(fsLightbox, 0);

beforeEach(() => {
    sourceLoadActioner.runInitialLoadActions = jest.fn();
    sourceLoadActioner.runNormalLoadActions = jest.fn();
});

test('handleImageLoad', () => {
    expectedSourceLoadActionerParams = [0, 1000, 500];
    sourceLoadHandler.handleImageLoad({ target: { width: 1000, height: 500 } });
    expect(sourceLoadActioner.runInitialLoadActions).toBeCalled();
    expect(sourceLoadActioner.runNormalLoadActions).not.toBeCalled();
    expect(sourceLoadHandler.handleImageLoad).toBe(sourceLoadActioner.runNormalLoadActions);
});

test('handleVideoLoad', () => {
    expectedSourceLoadActionerParams = [0, 2000, 1000];
    sourceLoadHandler.handleVideoLoad({ target: { videoWidth: 2000, videoHeight: 1000 } });
    expect(sourceLoadActioner.runInitialLoadActions).toBeCalled();
    expect(sourceLoadActioner.runNormalLoadActions).not.toBeCalled();
    expect(sourceLoadHandler.handleVideoLoad).toBe(sourceLoadActioner.runNormalLoadActions);
});

test('handleMaxDimensionsSourceLoad', () => {
    expectedSourceLoadActionerParams = [0, 200, 500];
    fsLightbox.props.globalMaxDimensions = { width: 200, height: 500 };
    sourceLoadHandler.handleMaxDimensionsSourceLoad();
    expect(sourceLoadActioner.runInitialLoadActions).toBeCalled();
    expect(sourceLoadActioner.runNormalLoadActions).not.toBeCalled();
    expect(sourceLoadHandler.handleMaxDimensionsSourceLoad).toBe(sourceLoadActioner.runNormalLoadActions);

    sourceLoadHandler = new SourceLoadHandler(fsLightbox, 0);
    expectedSourceLoadActionerParams = [0, 1000, 1000];
    fsLightbox.props.maxDimensions = [{width: 1000, height: 1000}];
    sourceLoadHandler.handleMaxDimensionsSourceLoad();

    delete fsLightbox.props.maxDimensions;
    delete fsLightbox.props.globalMaxDimensions;
    sourceLoadHandler = new SourceLoadHandler(fsLightbox, 0);
    expectedSourceLoadActionerParams = [0, 1920, 1080];
    sourceLoadHandler.handleMaxDimensionsSourceLoad();
});

