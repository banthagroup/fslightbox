import React from 'react';
import { shallow } from "enzyme/build";
import FsLightbox from "./FsLightbox";
import { testSources } from "../tests/__tests-vars__/testVariables";
import * as setUpCoreObject from "./core/setUpCore";
import * as runLightboxUnmountActionsObject from "./core/main-component/unmounting/runLightboxUnmountActions";
import * as runLightboxMountedActionsObject from "./core/main-component/mounting/runLightboxMountedActions";
import * as getInitialCurrentIndexObject from "./core/stage/getInitialCurrentIndex";
import SlideButton from "./components/SlideButton";
import * as getSourcesCountObject from "./core/sources/getSourcesCount";

let fsLightboxWrapper = shallow(<FsLightbox toggler={ false } sources={ testSources } />, {
    disableLifecycleMethods: true
});
let fsLightbox = fsLightboxWrapper.instance();

// resetting props to make them extensible
delete fsLightbox.props;
fsLightbox.props = {
    toggler: false,
    sources: testSources
};

describe('data', () => {
    const tempGetSourcesCount = getSourcesCountObject.getSourcesCount;
    getSourcesCountObject.getSourcesCount = jest.fn(() => 'sources-count');

    delete fsLightbox.props.slideDistance;
    fsLightbox.setUpData();
    expect(getSourcesCountObject.getSourcesCount).toBeCalledWith(fsLightbox);
    expect(fsLightbox.data.slideDistance).toBe(0.3);
    expect(fsLightbox.data.sourcesCount).toBe('sources-count');

    fsLightbox.props.slideDistance = 2.5;
    fsLightbox.setUpData();
    expect(fsLightbox.data.slideDistance).toBe(2.5);

    getSourcesCountObject.getSourcesCount = tempGetSourcesCount;
});

test('stageIndexes', () => {
    getInitialCurrentIndexObject.getInitialCurrentIndex = () => 950;
    fsLightbox.setUpStageIndexes();

    expect(fsLightbox.stageIndexes).toEqual({
        previous: undefined,
        current: 950,
        next: undefined
    });
});

test('main component state', () => {
    fsLightbox.props.openOnMount = false;
    fsLightbox.setUpStates();
    expect(fsLightbox.state.isOpen).toBe(false);

    fsLightbox.props.openOnMount = true;
    fsLightbox.setUpStates();
    expect(fsLightbox.state.isOpen).toBe(true);
});

test('getters', () => {
    expect(fsLightbox.getProps()).toBe(fsLightbox.props);
    expect(fsLightbox.getState()).toBe(fsLightbox.state);
});

test('setters', () => {
    fsLightbox.setState = jest.fn();
    fsLightbox.setMainComponentState('value', 'callback');
    expect(fsLightbox.setState).toBeCalledWith('value', 'callback');
});

test('resolve', () => {
    function constructor(fsLightboxDependency, firstParam, secondParam) {
        expect(fsLightboxDependency).toBe(fsLightbox);
        expect(firstParam).toBe('first-param');
        expect(secondParam).toBe('second-param');
    }

    expect(fsLightbox.resolve(constructor, ['first-param', 'second-param'])).toBeInstanceOf(constructor);
});

test('core', () => {
    setUpCoreObject.setUpCore = jest.fn();
    fsLightbox.setUpCore();
    expect(setUpCoreObject.setUpCore).toBeCalledWith(fsLightbox);
});

test('componentDidUpdate', () => {
    fsLightbox.core.lightboxUpdater.handleUpdate = jest.fn();
    fsLightbox.componentDidUpdate('prev-props');
    expect(fsLightbox.core.lightboxUpdater.handleUpdate).toBeCalledWith('prev-props');
});

test('componentDidMount', () => {
    runLightboxMountedActionsObject.runLightboxMountedActions = jest.fn();
    fsLightbox.componentDidMount();
    expect(runLightboxMountedActionsObject.runLightboxMountedActions).toBeCalled();
});

test('componentWillUnmount', () => {
    runLightboxUnmountActionsObject.runLightboxUnmountActions = jest.fn();
    fsLightbox.componentWillUnmount();
    expect(runLightboxUnmountActionsObject.runLightboxUnmountActions).toBeCalled();
});

describe('DOM', () => {
    test('returning null when isOpen is false', () => {
        fsLightboxWrapper.setState({
            isOpen: false,
            sources: ['test-url']
        });
        expect(fsLightboxWrapper.equals(null)).toBeTruthy();
    });

    describe('rendering toolbarButtons or not (if there is only 1 slide toolbarButtons should not be rendered)', () => {
        let slideButtonPrevious;
        let slideButtonNext;

        test('sourcesCount === 1', () => {
            fsLightboxWrapper = shallow(
                <FsLightbox
                    openOnMount={ true }
                    toggler={ false }
                    sources={ ['only one'] }
                />, {
                    disableLifecycleMethods: true
                }
            );

            slideButtonPrevious = <SlideButton
                onClick={ fsLightboxWrapper.instance().core.slideChangeFacade.changeToPrevious }
                name='previous'
                d='M18.271,9.212H3.615l4.184-4.184c0.306-0.306,0.306-0.801,0-1.107c-0.306-0.306-0.801-0.306-1.107,0L1.21,9.403C1.194,9.417,1.174,9.421,1.158,9.437c-0.181,0.181-0.242,0.425-0.209,0.66c0.005,0.038,0.012,0.071,0.022,0.109c0.028,0.098,0.075,0.188,0.142,0.271c0.021,0.026,0.021,0.061,0.045,0.085c0.015,0.016,0.034,0.02,0.05,0.033l5.484,5.483c0.306,0.307,0.801,0.307,1.107,0c0.306-0.305,0.306-0.801,0-1.105l-4.184-4.185h14.656c0.436,0,0.788-0.353,0.788-0.788S18.707,9.212,18.271,9.212z'
            />;

            slideButtonNext = <SlideButton
                onClick={ fsLightboxWrapper.instance().core.slideChangeFacade.changeToNext }
                name='next'
                d='M1.729,9.212h14.656l-4.184-4.184c-0.307-0.306-0.307-0.801,0-1.107c0.305-0.306,0.801-0.306,1.106,0l5.481,5.482c0.018,0.014,0.037,0.019,0.053,0.034c0.181,0.181,0.242,0.425,0.209,0.66c-0.004,0.038-0.012,0.071-0.021,0.109c-0.028,0.098-0.075,0.188-0.143,0.271c-0.021,0.026-0.021,0.061-0.045,0.085c-0.015,0.016-0.034,0.02-0.051,0.033l-5.483,5.483c-0.306,0.307-0.802,0.307-1.106,0c-0.307-0.305-0.307-0.801,0-1.105l4.184-4.185H1.729c-0.436,0-0.788-0.353-0.788-0.788S1.293,9.212,1.729,9.212z'
            />;

            expect(fsLightboxWrapper.find('.fslightbox-container')
                .children()
                .find('SlideButton'))
                .toHaveLength(0);
        });

        test('totalSlide > 1', () => {
            fsLightboxWrapper = shallow(
                <FsLightbox
                    openOnMount={ true }
                    toggler={ false }
                    sources={ ['first', 'second'] }
                />, {
                    disableLifecycleMethods: true
                }
            );

            slideButtonPrevious = <SlideButton
                onClick={ fsLightboxWrapper.instance().core.slideChangeFacade.changeToPrevious }
                name='previous'
                d='M18.271,9.212H3.615l4.184-4.184c0.306-0.306,0.306-0.801,0-1.107c-0.306-0.306-0.801-0.306-1.107,0L1.21,9.403C1.194,9.417,1.174,9.421,1.158,9.437c-0.181,0.181-0.242,0.425-0.209,0.66c0.005,0.038,0.012,0.071,0.022,0.109c0.028,0.098,0.075,0.188,0.142,0.271c0.021,0.026,0.021,0.061,0.045,0.085c0.015,0.016,0.034,0.02,0.05,0.033l5.484,5.483c0.306,0.307,0.801,0.307,1.107,0c0.306-0.305,0.306-0.801,0-1.105l-4.184-4.185h14.656c0.436,0,0.788-0.353,0.788-0.788S18.707,9.212,18.271,9.212z'
            />;

            slideButtonNext = <SlideButton
                onClick={ fsLightboxWrapper.instance().core.slideChangeFacade.changeToNext }
                name='next'
                d='M1.729,9.212h14.656l-4.184-4.184c-0.307-0.306-0.307-0.801,0-1.107c0.305-0.306,0.801-0.306,1.106,0l5.481,5.482c0.018,0.014,0.037,0.019,0.053,0.034c0.181,0.181,0.242,0.425,0.209,0.66c-0.004,0.038-0.012,0.071-0.021,0.109c-0.028,0.098-0.075,0.188-0.143,0.271c-0.021,0.026-0.021,0.061-0.045,0.085c-0.015,0.016-0.034,0.02-0.051,0.033l-5.483,5.483c-0.306,0.307-0.802,0.307-1.106,0c-0.307-0.305-0.307-0.801,0-1.105l4.184-4.185H1.729c-0.436,0-0.788-0.353-0.788-0.788S1.293,9.212,1.729,9.212z'
            />;

            expect(fsLightboxWrapper.find('.fslightbox-container')
                .children()
                .filter('SlideButton')
                .at(0)
                .equals(
                    <SlideButton
                        onClick={ fsLightboxWrapper.instance().core.slideChangeFacade.changeToPrevious }
                        name='previous'
                        d='M18.271,9.212H3.615l4.184-4.184c0.306-0.306,0.306-0.801,0-1.107c-0.306-0.306-0.801-0.306-1.107,0L1.21,9.403C1.194,9.417,1.174,9.421,1.158,9.437c-0.181,0.181-0.242,0.425-0.209,0.66c0.005,0.038,0.012,0.071,0.022,0.109c0.028,0.098,0.075,0.188,0.142,0.271c0.021,0.026,0.021,0.061,0.045,0.085c0.015,0.016,0.034,0.02,0.05,0.033l5.484,5.483c0.306,0.307,0.801,0.307,1.107,0c0.306-0.305,0.306-0.801,0-1.105l-4.184-4.185h14.656c0.436,0,0.788-0.353,0.788-0.788S18.707,9.212,18.271,9.212z'
                    />
                )).toBe(true);

            expect(fsLightboxWrapper.find('.fslightbox-container')
                .children()
                .filter('SlideButton')
                .at(1)
                .equals(
                    <SlideButton
                        onClick={ fsLightboxWrapper.instance().core.slideChangeFacade.changeToNext }
                        name='next'
                        d='M1.729,9.212h14.656l-4.184-4.184c-0.307-0.306-0.307-0.801,0-1.107c0.305-0.306,0.801-0.306,1.106,0l5.481,5.482c0.018,0.014,0.037,0.019,0.053,0.034c0.181,0.181,0.242,0.425,0.209,0.66c-0.004,0.038-0.012,0.071-0.021,0.109c-0.028,0.098-0.075,0.188-0.143,0.271c-0.021,0.026-0.021,0.061-0.045,0.085c-0.015,0.016-0.034,0.02-0.051,0.033l-5.483,5.483c-0.306,0.307-0.802,0.307-1.106,0c-0.307-0.305-0.307-0.801,0-1.105l4.184-4.185H1.729c-0.436,0-0.788-0.353-0.788-0.788S1.293,9.212,1.729,9.212z'
                    />
                )
            ).toBe(true);
        });
    });
});
