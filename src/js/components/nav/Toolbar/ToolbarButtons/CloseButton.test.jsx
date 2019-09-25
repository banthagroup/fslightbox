import React from 'react';
import { shallow } from 'enzyme/build';
import CloseButton from "../../../../../src/components/nav/toolbar/toolbar-buttons/CloseButton";

const fsLightbox = { core: { lightboxCloser: { closeLightbox: jest.fn() } } };
const closeButton = shallow(<CloseButton fsLightbox={ fsLightbox } />);

test('closing lightbox on clicking close button', () => {
    closeButton.simulate('click');
    expect(fsLightbox.core.lightboxCloser.closeLightbox).toBeCalled();
});
