export function renderSourceAnimationWrapper({ elements: { sourceMainWrappers, sourceAnimationWrappers } }, i) {
    sourceAnimationWrappers[i] = document.createElement('div');
    sourceMainWrappers[i].appendChild(sourceAnimationWrappers[i]);
}
