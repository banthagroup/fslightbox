import React from 'react';
import PropTypes from 'prop-types';
import Svg from "../../helpers/Svg.jsx";

const ToolbarButton = ({ onClick, viewBox, size, d, title }) => (
    <div onClick={ onClick }
         className="fslightbox-toolbar-button fslightbox-flex-centered"
         title={ title }>
        <Svg viewBox={ viewBox } size={ size } d={ d }/>
    </div>
);

ToolbarButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    viewBox: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    d: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};
export default ToolbarButton;