import { initializeLightbox } from "./initializeLightbox";
import * as createSourcesObject from "../../sources/creating/createSources";
import * as renderSourcesOutersWrapperObject from "../../../components/sources/renderSourceWrappersContainer";
import * as fillSourcesOutersTransformersCollectionObject
    from "../../collections/fillSourcesOutersTransformersCollection";
import * as renderNavObject from "../../../components/nav/renderNav";
import * as renderSlideButtonsObject from "../../../components/renderSlideButtons";
import * as setUpCoreObject from "../../setUpCore";

const fsLightbox = {
    data: { isInitialized: false },
    core: { eventsDispatcher: { dispatch: jest.fn() } },
    elements: { container: null },
    props: { sources: { length: 1 } }
};

const eventsDispatcher = fsLightbox.core.eventsDispatcher;
fillSourcesOutersTransformersCollectionObject.fillSourcesOutersTransformersCollection = jest.fn();
setUpCoreObject.setUpCore = jest.fn();
createSourcesObject.createSources = jest.fn();
renderSourcesOutersWrapperObject.renderSourceWrappersContainer = jest.fn();
renderNavObject.renderNav = jest.fn();
renderSlideButtonsObject.renderSlideButtons = jest.fn();

const container = { key: 'container' };
document.createElement = () => container;

test('init actions', () => {
    initializeLightbox(fsLightbox);
    expect(fsLightbox.data.isInitialized).toBe(true);
    expect(fillSourcesOutersTransformersCollectionObject.fillSourcesOutersTransformersCollection).toBeCalledWith(fsLightbox);
    expect(setUpCoreObject.setUpCore).toBeCalledWith(fsLightbox);
    expect(renderSourcesOutersWrapperObject.renderSourceWrappersContainer).toBeCalledWith(fsLightbox);
    expect(renderNavObject.renderNav).toBeCalled();
    expect(renderSlideButtonsObject.renderSlideButtons).not.toBeCalled();
    expect(createSourcesObject.createSources).toBeCalledWith(fsLightbox);
    expect(eventsDispatcher.dispatch).toBeCalledWith('onInit');

    fsLightbox.props.sources.length = 2;
    initializeLightbox(fsLightbox);
    expect(renderSlideButtonsObject.renderSlideButtons).toBeCalledWith(fsLightbox);
});
