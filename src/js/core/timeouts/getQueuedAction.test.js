import { getQueuedAction } from "./getQueuedAction";

const action = jest.fn();
let setTimeoutParams;
window.setTimeout = (...params) => { setTimeoutParams = params; };

test('timeout queue', () => {
    const runQueuedAction = getQueuedAction(action, 2000);
    runQueuedAction();
    expect(setTimeoutParams[1]).toBe(2000);
    setTimeoutParams[0]();
    expect(action).toBeCalledTimes(1);

    runQueuedAction();
    runQueuedAction();
    expect(action).toBeCalledTimes(1);
    setTimeoutParams[0]();
    setTimeoutParams[0]();
    expect(action).toBeCalledTimes(2);
});
