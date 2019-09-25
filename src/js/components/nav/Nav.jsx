import React from 'react';
import Toolbar from "./toolbar/Toolbar.jsx";
import SlideNumber from "./SlideNumber.jsx";
import { PREFIX } from "../../constants/classes-names";

const Nav = ({ fsLightbox }) => {
    return (
        <div className={ `${ PREFIX }nav` }>
            <Toolbar fsLightbox={ fsLightbox }/>
            { fsLightbox.data.sourcesCount > 1 && <SlideNumber fsLightbox={ fsLightbox }/> }
        </div>
    );
};
export default Nav;
