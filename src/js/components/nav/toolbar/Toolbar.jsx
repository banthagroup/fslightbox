import React from 'react';
import FullscreenButton from "./toolbar-buttons/FullscreenButton.jsx";
import CloseButton from "./toolbar-buttons/CloseButton.jsx";
import { PREFIX } from "../../../constants/classes-names";

const Toolbar = ({ fsLightbox }) => (
    <div className={ `${ PREFIX }toolbar` }>
        <FullscreenButton fsLightbox={ fsLightbox }/>
        <CloseButton fsLightbox={ fsLightbox }/>
    </div>
);
export default Toolbar;
