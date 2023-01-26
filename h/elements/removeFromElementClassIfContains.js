export function removeFromElementClassIfContains(element, className) {
    const classList = element.classList;
    if (classList.contains(className)) {
        classList.remove(className);
    }
}
