export function renderSourceInner({ elements: { sourcesOuters, sourcesInners } }, i) {
    sourcesInners[i] = document.createElement('div');
    sourcesOuters[i].appendChild(sourcesInners[i]);
}
