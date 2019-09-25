export function addToElementClassIfNotContains(element, className) {
    const classList = element.current.classList;
    if (!classList.contains(className)) {
        classList.add(className);
    }
}
