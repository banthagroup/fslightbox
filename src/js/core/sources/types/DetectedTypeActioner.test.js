import { CUSTOM_TYPE, IMAGE_TYPE, INVALID_TYPE, VIDEO_TYPE, YOUTUBE_TYPE } from "../../../constants/core-constants";
import { SourceLoadHandler } from "../SourceLoadHandler";
import { DetectedTypeActioner } from "./DetectedTypeActioner";
import * as renderImageObject from "../../../components/sources/proper-sources/renderImage";
import * as  renderVideoObject from "../../../components/sources/proper-sources/renderVideo";
import * as renderYoutubeObject from "../../../components/sources/proper-sources/renderYoutube";
import * as renderCustomObject from "../../../components/sources/proper-sources/renderCustom";
import * as renderInvalidObject from "../../../components/sources/proper-sources/renderInvalid";

const fsLightbox = {
    collections: { sourcesLoadsHandlers: [], sourcesRenderFunctions: [] },
    core: { stageManager: { isSourceInStage: jest.fn(() => false) } },
    componentsStates: { sourcesInnersUpdatersCollection: [{ set: jest.fn() }] },
    elements: { sourcesComponents: [] },
    resolve: (constructorDependency, params) => {
        if (constructorDependency === SourceLoadHandler) {
            expect(params).toEqual(expectedSourceLoadHandlerParams);
            return sourceLoadHandler;
        } else {
            throw new Error('Invalid dependency');
        }
    },
    props: {}
};
let expectedSourceLoadHandlerParams;
const lightboxState = { isOpen: false };
const sourceLoadHandler = 'source-load-handler';

renderImageObject.renderImage = jest.fn();
renderVideoObject.renderVideo = jest.fn();
renderYoutubeObject.renderYoutube = jest.fn();
renderCustomObject.renderCustom = jest.fn();
renderInvalidObject.renderInvalid = jest.fn();

let detectedTypeActions = new DetectedTypeActioner(fsLightbox);

test('runActionsForSourceTypeAndIndex', () => {
    expectedSourceLoadHandlerParams = [0];
    detectedTypeActions.runActionsForSourceTypeAndIndex(IMAGE_TYPE, 0);
    expect(fsLightbox.collections.sourcesLoadsHandlers[0]).toBe(sourceLoadHandler);
    expect(renderImageObject.renderImage).not.toBeCalled();
    expect(renderVideoObject.renderVideo).not.toBeCalled();
    expect(renderYoutubeObject.renderYoutube).not.toBeCalled();
    expect(renderCustomObject.renderCustom).not.toBeCalled();
    expect(renderInvalidObject.renderInvalid).not.toBeCalled();
    fsLightbox.collections.sourcesRenderFunctions[0]();
    expect(renderImageObject.renderImage).toBeCalledWith(fsLightbox, 0);

    fsLightbox.core.stageManager.isSourceInStage = () => true;
    detectedTypeActions.runActionsForSourceTypeAndIndex(IMAGE_TYPE, 0);
    expect(renderImageObject.renderImage).toHaveBeenNthCalledWith(2, fsLightbox, 0);
    expect(renderVideoObject.renderVideo).not.toBeCalled();
    expect(renderYoutubeObject.renderYoutube).not.toBeCalled();
    expect(renderCustomObject.renderCustom).not.toBeCalled();
    expect(renderInvalidObject.renderInvalid).not.toBeCalled();

    fsLightbox.props.disableThumbs = true;
    lightboxState.isOpen = true;
    detectedTypeActions = new DetectedTypeActioner(fsLightbox);
    detectedTypeActions.runActionsForSourceTypeAndIndex(VIDEO_TYPE, 0);
    expect(renderImageObject.renderImage).toBeCalledTimes(2);
    expect(renderVideoObject.renderVideo).toBeCalledWith(fsLightbox, 0);
    expect(renderYoutubeObject.renderYoutube).not.toBeCalled();
    expect(renderCustomObject.renderCustom).not.toBeCalled();
    expect(renderInvalidObject.renderInvalid).not.toBeCalled();

    detectedTypeActions.runActionsForSourceTypeAndIndex(YOUTUBE_TYPE, 0);
    expect(renderImageObject.renderImage).toBeCalledTimes(2);
    expect(renderVideoObject.renderVideo).toBeCalledTimes(1);
    expect(renderYoutubeObject.renderYoutube).toBeCalledWith(fsLightbox, 0);
    expect(renderCustomObject.renderCustom).not.toBeCalled();
    expect(renderInvalidObject.renderInvalid).not.toBeCalled();

    detectedTypeActions.runActionsForSourceTypeAndIndex(CUSTOM_TYPE, 0);
    expect(renderImageObject.renderImage).toBeCalledTimes(2);
    expect(renderVideoObject.renderVideo).toBeCalledTimes(1);
    expect(renderYoutubeObject.renderYoutube).toBeCalledTimes(1);
    expect(renderCustomObject.renderCustom).toBeCalledWith(fsLightbox, 0);
    expect(renderInvalidObject.renderInvalid).not.toBeCalled();

    fsLightbox.collections.sourcesLoadsHandlers[0] = undefined;
    detectedTypeActions.runActionsForSourceTypeAndIndex(INVALID_TYPE, 0);
    expect(fsLightbox.collections.sourcesLoadsHandlers[0]).toBeUndefined();
    expect(renderImageObject.renderImage).toBeCalledTimes(2);
    expect(renderVideoObject.renderVideo).toBeCalledTimes(1);
    expect(renderYoutubeObject.renderYoutube).toBeCalledTimes(1);
    expect(renderCustomObject.renderCustom).toBeCalledTimes(1);
    expect(renderInvalidObject.renderInvalid).toBeCalledWith(fsLightbox, 0);
});
