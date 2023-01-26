export function setUpEventsDispatcher({ core: { eventsDispatcher: self }, props }) {
    self.dispatch = (eventName) => {
        if (props[eventName]) {
            props[eventName]();
        }
    };
}
