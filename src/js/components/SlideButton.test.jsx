import React from 'react';
import { shallow } from "enzyme";
import SlideButton from "../../src/components/SlideButton";

const onClick = () => {};

let slideButton = shallow(<SlideButton
    onClick={ onClick }
    name='next'
    d='M1.729'
/>);

test('slide button', () => {
    expect(slideButton.prop('title')).toBe('Next slide');
    expect(slideButton.prop('onClick')).toBe(onClick);
    expect(slideButton.prop('className')).toBe(
        'fslightbox-slide-btn-container fslightbox-slide-btn-next-container'
    );
    expect(slideButton.find('Svg').prop('d')).toBe('M1.729');
});
