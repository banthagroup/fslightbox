import React from 'react';
import { shallow } from 'enzyme';
import Nav from "./Nav";

const fsLightbox = { data: { sourcesCount: 2 } };
let nav;

test('data.sourcesCount > 2 - rendering SlideNumber and testing DOM', () => {
    fsLightbox.data.sourcesCount = 2;
    nav = shallow(<Nav fsLightbox={ fsLightbox }/>);

    expect(nav.find('SlideNumber')).toHaveLength(1);
});

test('data.sourcesCount === 1 - not rendering SlideNumber', () => {
    fsLightbox.data.sourcesCount = 1;
    nav = shallow(<Nav fsLightbox={ fsLightbox }/>);

    expect(nav.find('SlideNumber')).toHaveLength(0);
});
