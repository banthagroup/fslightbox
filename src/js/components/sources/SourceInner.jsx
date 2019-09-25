import React, { useState } from 'react';

const SourceInner = (
    {
        fsLightbox: {
            componentsStates: { sourcesInnersUpdatersCollection },
            elements: { sourcesComponents, sourcesInners }
        }, i
    }
) => {
    const [sourceInner, setSourceInnerUpdater] = useState(false);
    sourcesInnersUpdatersCollection[i] = { get: () => sourceInner, set: setSourceInnerUpdater };

    return (
        <div ref={ sourcesInners[i] }>
            { sourcesComponents[i] }
        </div>
    );
};

export default SourceInner;
