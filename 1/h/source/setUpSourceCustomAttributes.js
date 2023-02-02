export function setUpSourceCustomAttributes({ elements: { sources }, props: { customAttributes } }, i) {
    for (let name in customAttributes[i]) {
        sources[i].setAttribute(name, customAttributes[i][name]);
    }
}