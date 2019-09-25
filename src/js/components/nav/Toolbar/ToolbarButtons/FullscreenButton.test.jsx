import React from 'react';
import { shallow } from "enzyme";
import FullscreenButton from "../../toolbar/toolbar-buttons/FullscreenButton";
import { testComponentStateForStateChainAndFsLightbox } from "../../../../../tests/__tests-helpers__/testComponentStateForStateChainAndFsLightbox";

const fsLightbox = {
    componentsStates: { toolbarButtons: { fullscreen: {} } },
    core: { fullscreenToggler: { enterFullscreen: jest.fn(), exitFullscreen: jest.fn() } }
};
let fullscreenButton = shallow(<FullscreenButton fsLightbox={ fsLightbox } />);

describe('state', () => {
    testComponentStateForStateChainAndFsLightbox("toolbarButtons.fullscreen", fsLightbox);

    test('it should have default value false when document is not defined', () => {
        const tempWindow = global.window;
        delete global.window;
        fullscreenButton = shallow(<FullscreenButton fsLightbox={ fsLightbox } />);
        expect(fsLightbox.componentsStates.toolbarButtons.fullscreen.get()).toBe(false);
        global.window = tempWindow;
    });

    test('default value true when fullscreen is open', () => {
        window.document.fullscreenElement = 'element';
        fullscreenButton = shallow(<FullscreenButton fsLightbox={ fsLightbox } />);
        expect(fsLightbox.componentsStates.toolbarButtons.fullscreen.get()).toBe(true);
    });
});

test('test toggling fullscreen', () => {
    fsLightbox.componentsStates.toolbarButtons.fullscreen.set(false);
    fullscreenButton.simulate('click');
    expect(fsLightbox.core.fullscreenToggler.enterFullscreen).toBeCalled();
    expect(fsLightbox.core.fullscreenToggler.exitFullscreen).not.toBeCalled();

    fsLightbox.componentsStates.toolbarButtons.fullscreen.set(true);
    fullscreenButton.simulate('click');
    expect(fsLightbox.core.fullscreenToggler.enterFullscreen).toBeCalledTimes(1);
    expect(fsLightbox.core.fullscreenToggler.exitFullscreen).toBeCalled();
});
