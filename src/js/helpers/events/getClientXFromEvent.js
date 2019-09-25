/**
 * Function retrieves clientX from touch or mouse event
 * @param event
 */
export function getClientXFromEvent(event) {
    return (event.touches) ?
        event.touches[0].clientX :
        event.clientX;
}
