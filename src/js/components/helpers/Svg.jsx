import React from 'react';
import PropTypes from 'prop-types';

const Svg = ({ size, viewBox, d }) =>
    (
        <svg width={ size }
             height={ size }
             viewBox={ viewBox }
             xmlns="http://www.w3.org/2000/svg">
            <path className="fslightbox-svg-path" d={ d }></path>
        </svg>
    );

Svg.propTypes = {
    viewBox: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    d: PropTypes.string.isRequired
};

export default Svg;