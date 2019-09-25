export function SourceStylerBucket(
    {
        data: { sourcesScales },
        elements: { sources }
    }, i, defaultWidth, defaultHeight
) {
    this.ifSourcesScaledResetScale = () => {
        if (sourcesScales[i] && sourcesScales[i] !== 1) {
            sourcesScales[i] = 1;
            sources[i].current.style.transform = 'scale(1)';
        }
    };

    this.styleSourceUsingScaleAndHeight = (sourceHolderScale, enhancementHeight) => {
        if (innerWidth < innerHeight && defaultWidth > defaultHeight + enhancementHeight) {
            sourcesScales[i] = 1 / sourceHolderScale;
            sources[i].current.style.transform = `scale(${ 1 / sourceHolderScale })`;
        } else {
            this.ifSourcesScaledResetScale();
        }
    };
}
