import { initializeLightbox } from "./initializeLightbox";
import * as createSourcesObject from "../../sources/creating/createSources";
import * as renderSourcesOutersWrapperObject from "../../../components/sources/renderSourcesOutersWrapper";

const fsLightbox = {
    data: { isInitialized: false },
    core: { eventsDispatcher: { dispatch: jest.fn() } },
    elements: { container: null }
};


const eventsDispatcher = fsLightbox.core.eventsDispatcher;
createSourcesObject.createSources = jest.fn();
renderSourcesOutersWrapperObject.renderSourcesOutersWrapper = jest.fn();

const container = { key: 'container' };
document.createElement = () => container;
document.body.appendChild = jest.fn();

test('init actions', () => {
    initializeLightbox(fsLightbox);
    expect(fsLightbox.data.isInitialized).toBe(true);
    expect(document.body.appendChild).toBeCalledWith(container);
    expect(createSourcesObject.createSources).toBeCalledWith(fsLightbox);
    expect(renderSourcesOutersWrapperObject.renderSourcesOutersWrapper).toBeCalledWith(fsLightbox);
    expect(eventsDispatcher.dispatch).toBeCalledWith('onInit');
});
