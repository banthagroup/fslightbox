/**
 * Set up source class with custom class if set
 */
export function setUpSourceClassName(
    {
        elements: { sources },
        props: { customClasses }
    },
    i, baseClassName
) {
    const customClassName = customClasses[i] ? customClasses[i] : '';
    sources[i].className = baseClassName + ' ' + customClassName;
}