export function getInnerElementOfWidthGetter() {
    const inner = document.createElement('div');
    inner.style.width = '100%';
    return inner;
}
