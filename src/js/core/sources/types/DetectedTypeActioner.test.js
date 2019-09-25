import React from 'react'
import { CUSTOM_TYPE, IMAGE_TYPE, INVALID_TYPE, VIDEO_TYPE, YOUTUBE_TYPE } from "../../../constants/core-constants";
import Image from "../../../components/sources/proper-sources/Image";
import Video from "../../../components/sources/proper-sources/Video";
import Youtube from "../../../components/sources/proper-sources/Youtube";
import Invalid from "../../../components/sources/proper-sources/Invalid";
import { SourceLoadHandler } from "../SourceLoadHandler";
import { DetectedTypeActioner } from "./DetectedTypeActioner";
import Custom from "../../../components/sources/proper-sources/Custom";

const fsLightbox = {
    collections: { sourcesLoadsHandlers: [] },
    getState: () => lightboxState,
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
const sourceLoadHandler = {
    setUpLoadForImage: jest.fn(),
    setUpLoadForVideo: jest.fn(),
    setUpLoadForYoutube: jest.fn(),
    setUpLoadForCustom: jest.fn()
};

let detectedTypeActions = new DetectedTypeActioner(fsLightbox);

test('runActionsForSourceTypeAndIndex', () => {
    expectedSourceLoadHandlerParams = [0];
    detectedTypeActions.runActionsForSourceTypeAndIndex(IMAGE_TYPE, 0);
    expect(fsLightbox.collections.sourcesLoadsHandlers[0]).toBe(sourceLoadHandler);
    expect(sourceLoadHandler.setUpLoadForImage).toBeCalled();
    expect(sourceLoadHandler.setUpLoadForVideo).not.toBeCalled();
    expect(sourceLoadHandler.setUpLoadForYoutube).not.toBeCalled();
    expect(sourceLoadHandler.setUpLoadForCustom).not.toBeCalled();
    expect(fsLightbox.elements.sourcesComponents[0]).toEqual(<Image fsLightbox={ fsLightbox } i={ 0 }/>);
    expect(fsLightbox.componentsStates.sourcesInnersUpdatersCollection[0].set).not.toBeCalled();

    fsLightbox.props.disableThumbs = true;
    lightboxState.isOpen = true;
    detectedTypeActions = new DetectedTypeActioner(fsLightbox);
    detectedTypeActions.runActionsForSourceTypeAndIndex(VIDEO_TYPE, 0);
    expect(sourceLoadHandler.setUpLoadForImage).toBeCalledTimes(1);
    expect(sourceLoadHandler.setUpLoadForVideo).toBeCalled();
    expect(sourceLoadHandler.setUpLoadForYoutube).not.toBeCalled();
    expect(sourceLoadHandler.setUpLoadForCustom).not.toBeCalled();
    expect(fsLightbox.elements.sourcesComponents[0]).toEqual(<Video fsLightbox={ fsLightbox } i={ 0 }/>);
    expect(fsLightbox.componentsStates.sourcesInnersUpdatersCollection[0].set).toBeCalledWith(true);

    detectedTypeActions.runActionsForSourceTypeAndIndex(YOUTUBE_TYPE, 0);
    expect(sourceLoadHandler.setUpLoadForImage).toBeCalledTimes(1);
    expect(sourceLoadHandler.setUpLoadForVideo).toBeCalledTimes(1);
    expect(sourceLoadHandler.setUpLoadForYoutube).toBeCalled();
    expect(sourceLoadHandler.setUpLoadForCustom).not.toBeCalled();
    expect(fsLightbox.elements.sourcesComponents[0]).toEqual(<Youtube fsLightbox={ fsLightbox } i={ 0 }/>);

    detectedTypeActions.runActionsForSourceTypeAndIndex(CUSTOM_TYPE, 0);
    expect(sourceLoadHandler.setUpLoadForImage).toBeCalledTimes(1);
    expect(sourceLoadHandler.setUpLoadForVideo).toBeCalledTimes(1);
    expect(sourceLoadHandler.setUpLoadForYoutube).toBeCalledTimes(1);
    expect(sourceLoadHandler.setUpLoadForCustom).toBeCalled();
    expect(fsLightbox.elements.sourcesComponents[0]).toEqual(<Custom fsLightbox={ fsLightbox } i={ 0 }/>);

    fsLightbox.collections.sourcesLoadsHandlers[0] = undefined;
    detectedTypeActions.runActionsForSourceTypeAndIndex(INVALID_TYPE, 0);
    expect(fsLightbox.collections.sourcesLoadsHandlers[0]).toBeUndefined();
    expect(sourceLoadHandler.setUpLoadForImage).toBeCalledTimes(1);
    expect(sourceLoadHandler.setUpLoadForVideo).toBeCalledTimes(1);
    expect(sourceLoadHandler.setUpLoadForYoutube).toBeCalledTimes(1);
    expect(sourceLoadHandler.setUpLoadForCustom).toBeCalledTimes(1);
    expect(fsLightbox.elements.sourcesComponents[0]).toEqual(<Invalid fsLightbox={ fsLightbox } i={ 0 }/>);
});
