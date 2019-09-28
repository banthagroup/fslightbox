import { initializeLightbox } from "./initializeLightbox";
import * as createSourcesObject from "../../sources/creating/createSources";
import * as renderSourcesOutersWrapperObject from "../../../components/sources/renderSourcesOutersWrapper";
import * as fillSourcesOutersTransformersCollectionObject
    from "../../collections/fillSourcesOutersTransformersCollection";
import * as renderNavObject from "../../../components/nav/renderNav";
import * as renderSlideButtonsObject from "../../../components/renderSlideButtons";
import * as  setUpStageManagerObject from "../../stage/setUpStageManager";
import * as  setUpSlideChangeFacadeObject from "../../slide/setUpSlideChangeFacade";

const fsLightbox = {
    data: { isInitialized: false },
    core: { eventsDispatcher: { dispatch: jest.fn() } },
    elements: { container: null },
    props: { sources: { length: 1 } }
};

const eventsDispatcher = fsLightbox.core.eventsDispatcher;
fillSourcesOutersTransformersCollectionObject.fillSourcesOutersTransformersCollection = jest.fn();
setUpStageManagerObject.setUpStageManager = jest.fn();
setUpSlideChangeFacadeObject.setUpSlideChangeFacade = jest.fn();
createSourcesObject.createSources = jest.fn();
renderSourcesOutersWrapperObject.renderSourcesOutersWrapper = jest.fn();
renderNavObject.renderNav = jest.fn();
renderSlideButtonsObject.renderSlideButtons = jest.fn();


const container = { key: 'container' };
document.createElement = () => container;
document.body.appendChild = jest.fn();

test('init actions', () => {
    initializeLightbox(fsLightbox);
    expect(fsLightbox.data.isInitialized).toBe(true);
    expect(fillSourcesOutersTransformersCollectionObject.fillSourcesOutersTransformersCollection).toBeCalledWith(fsLightbox);
    expect(setUpStageManagerObject.setUpStageManager).toBeCalledWith(fsLightbox);
    expect(setUpSlideChangeFacadeObject.setUpSlideChangeFacade).toBeCalledWith(fsLightbox);
    expect(document.body.appendChild).toBeCalledWith(container);
    expect(createSourcesObject.createSources).toBeCalledWith(fsLightbox);
    expect(renderSourcesOutersWrapperObject.renderSourcesOutersWrapper).toBeCalledWith(fsLightbox);
    expect(renderNavObject.renderNav).toBeCalled();
    expect(renderSlideButtonsObject.renderSlideButtons).not.toBeCalled();
    expect(eventsDispatcher.dispatch).toBeCalledWith('onInit');

    fsLightbox.props.sources.length = 2;
    initializeLightbox(fsLightbox);
    expect(renderSlideButtonsObject.renderSlideButtons).toBeCalledWith(fsLightbox);
});
