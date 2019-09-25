import { ifOnUpdateExistsHandleItForState } from "./ifOnUpdateExistsHandleItForState";

const toBeCalled = jest.fn();
const state = {
    onUpdate: () => {
        toBeCalled();
    }
};

test('calling on update and deleting property', () => {
    ifOnUpdateExistsHandleItForState(state);
    expect(toBeCalled).toBeCalled();
    expect(state.onUpdate).toBeUndefined();
});
