export function runLightboxUnmountActions({ collections: { xhrs } }) {
    for (let i = 0; i < xhrs.length; i++) {
        xhrs[i].abort();
    }
}
