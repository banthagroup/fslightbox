import * as createAndAppendStylesObject from "../createAndAppendStyles";

// document is undefined so SSR is enabled styles cannot be injected
delete global.document;

createAndAppendStylesObject.createAndAppendStyles = jest.fn();

require('./styles-injection');

it('should not call createAndAppendStyles', () => {
    expect(createAndAppendStylesObject.createAndAppendStyles).not.toBeCalled();
});
