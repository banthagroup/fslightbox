import { getComponentChain } from "../__tests-services__/cypress/helpers";

specify('close lightbox, trigger pointer events, reopen lightbox and test if swiping works', () => {
    getComponentChain()
        .get('.fslightbox-toolbar-button')
        .last()
        .click()
        .document()
        .trigger('pointerdown', {
            pointerId: 1
        })
        .trigger('pointermove', {
            pointerId: 1
        })
        .trigger('pointerup', {
            pointerId: 1
        })
        .trigger('pointerdown', {
            pointerId: 2
        })
        .trigger('pointermove', {
            pointerId: 2
        })
        .trigger('pointerup', {
            pointerId: 2
        })
        .get('#lightbox-opener')
        .click()
        .get('[data-test-id="source-wrappers-container"]')
        .trigger('pointerdown', {
            pointerId: 3,
            screenX: 400
        })
        .document()
        .trigger('pointermove', {
            pointerId: 3,
            screenX: 200
        })
        .trigger('pointerup', {
            pointerId: 3
        })
        .get('[data-test-id="slide-number"]')
        .contains(2)
});