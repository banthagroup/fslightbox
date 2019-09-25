export function getLightboxUpdaterConditioner() {
    let previousProps;
    let currentProps;

    return {
        setPrevProps: (prevProps) => {
            previousProps = prevProps;
        },
        setCurrProps: (currProps) => {
            currentProps = currProps
        },
        hasTogglerPropChanged: () => {
            return previousProps.toggler !== currentProps.toggler;
        },
        hasSlidePropChanged: () => {
            return currentProps.slide !== undefined
                && currentProps.slide !== previousProps.slide;
        },
        hasSourcePropChanged: () => {
            return currentProps.source !== undefined
                && currentProps.source !== previousProps.source;
        },
        hasSourceIndexPropChanged: () => {
            return currentProps.sourceIndex !== undefined
                && currentProps.sourceIndex !== previousProps.sourceIndex;
        }
    };
}
