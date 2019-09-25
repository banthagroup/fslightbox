import { runLightboxUnmountActions } from "./runLightboxUnmountActions";

const abort = jest.fn();

const fsLightbox = {
    collections: {
        xhrs: [
            {
                abort: abort,
            },
            {
                abort: abort,
            },
            {
                abort: abort,
            },
            {
                abort: abort,
            },
            {
                abort: abort,
            },
        ]
    },
};

test('calling abort for all xhrs', () => {
    runLightboxUnmountActions(fsLightbox);

    expect(abort).toBeCalledTimes(5);
});
