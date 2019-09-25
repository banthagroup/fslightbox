import { setUpEventsDispatcher } from "./setUpEventsDispatcher";

const fsLightbox = {
    core: {
        eventsDispatcher: {}
    },
    props: {
        onOpen: jest.fn()
    }
};

const eventsDispatcher = fsLightbox.core.eventsDispatcher;

setUpEventsDispatcher(fsLightbox);

test('calling method form props by name', () => {
    eventsDispatcher.dispatch('onOpen');
    expect(fsLightbox.props.onOpen).toBeCalled();
});

test('not throwing method when prop method does not exist', () => {
    expect(() => {
        eventsDispatcher.dispatch('imaNotEvent');
    }).not.toThrowError();
});
