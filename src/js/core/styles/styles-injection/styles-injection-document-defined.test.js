import * as createAndAppendStylesObject from "../createAndAppendStyles";

// document is defined so styles should be injected
global.document = {};

createAndAppendStylesObject.createAndAppendStyles = jest.fn();

require('./styles-injection');

it('should call createAndAppendStyles', () => {
    expect(createAndAppendStylesObject.createAndAppendStyles).toBeCalled();
});
