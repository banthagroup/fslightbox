import React from 'react';
import Svg from "./helpers/Svg.jsx";
import { PREFIX } from "../constants/classes-names";

const SlideButton = ({ onClick, name, d }) => {
    const titleName = name.charAt(0).toUpperCase() + name.slice(1);

    return (
        <div onClick={ onClick }
             title={ `${ titleName } slide` }
             className={ `${ PREFIX }slide-btn-container ${ PREFIX }slide-btn-${ name }-container` }>
            <div className="fslightbox-slide-btn fslightbox-flex-centered">
                <Svg
                    viewBox="0 0 20 20"
                    size="20px"
                    d={ d }
                />
            </div>
        </div>
    );
};

export default SlideButton;
