export function getComponentChain(testComponent = 'BaseOpened') {
    return cy.visit(Cypress.env('url'))
        .get(`#${testComponent}`)
        .click();
}

/**
 * @param {string} name - style name
 * @param {string} value - style value
 * @return {string}
 */
export function computeStyle(name, value) {
    const testElement = document.createElement('div');
    testElement.style[name] = value;
    document.body.appendChild(testElement);
    return getComputedStyle(testElement)[name];
}
