export function removeFromElementChildIfContains(element, child) {
    if (element.contains(child)) {
        element.removeChild(child);
    }
}
