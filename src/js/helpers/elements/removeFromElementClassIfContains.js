export function removeFromElementClassIfContains(element, className) {
    const classList = element.current.classList;
    if (classList.contains(className)) {
        classList.remove(className);
    }
}
