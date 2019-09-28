export function addToElementClassIfNotContains(element, className) {
    const classList = element.classList;
    if (!classList.contains(className)) {
        classList.add(className);
    }
}
