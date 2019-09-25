import React, { useState } from 'react';
import {
    ABSOLUTED_CLASS_NAME,
    FLEX_CENTERED_CLASS_NAME,
    FULL_DIMENSION_CLASS_NAME, SOURCE_OUTER_CLASS_NAME
} from "../../constants/classes-names";
import Loader from "../helpers/Loader.jsx";
import SourceInner from "./SourceInner.jsx";

const SourceOuter = ({ fsLightbox, i }) => {
    const { componentsStates: { isSourceLoadedCollection }, elements: { sourcesOuters } } = fsLightbox;

    const [isSourceLoaded, setIsSourceLoaded] = useState(false);
    isSourceLoadedCollection[i] = { get: () => isSourceLoaded, set: setIsSourceLoaded };

    return (
        <div ref={ sourcesOuters[i] }
             className={ `${ SOURCE_OUTER_CLASS_NAME } ${ ABSOLUTED_CLASS_NAME } ${ FULL_DIMENSION_CLASS_NAME } ${ FLEX_CENTERED_CLASS_NAME }` }>
            { !isSourceLoaded && <Loader /> }
            <SourceInner fsLightbox={ fsLightbox } i={ i } />
        </div>
    );
};

export default SourceOuter;
