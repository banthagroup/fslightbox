import { getComponentChain } from '../__tests-services__/cypress/helpers';
import { ANIMATION_TIME } from '../../src/js/constants/css-constants';

specify('closing lightbox when clicking on background', () => {
    getComponentChain()
        .get('[data-test-id="source-wrappers-container"]')
        // clicking in the centre top so there is no toolbar and no source
        .then(sourceWrappersContainers => {
            // for some reason if dispatching event using cypress it sets target to source
            // so in walkaround event is dispatched manually
            const event = document.createEvent('Events');
            event.initEvent('pointerdown', true, false);
            sourceWrappersContainers[0].dispatchEvent(event);
        })
        .get('[data-test-id="source-wrappers-container"]')
        .trigger('pointerup')
        .wait(ANIMATION_TIME)
        .get('[data-test-id="container"]')
        .should('not.exist')
});
