import React from 'react';
import { shallow } from 'enzyme';
import SourcesOutersWrapper from "./SourcesOutersWrapper";
import SourceOuter from "./SourceOuter";

let fsLightbox = {
    data: { sourcesCount: 4 },
    elements: { sourcesOutersWrapper: React.createRef() },
    core: { slideSwipingDown: { listener: jest.fn() } }
};
const sourcesOutersWrapper = shallow(<SourcesOutersWrapper fsLightbox={ fsLightbox } />);

test('ref', () => {
    expect(sourcesOutersWrapper.getElement().ref).toBe(fsLightbox.elements.sourcesOutersWrapper);
});

test('calling on mouseDown and touchStart events', () => {
    sourcesOutersWrapper.simulate('mouseDown');
    expect(fsLightbox.core.slideSwipingDown.listener).toBeCalled();
    sourcesOutersWrapper.simulate('touchStart');
    expect(fsLightbox.core.slideSwipingDown.listener).toBeCalledTimes(2);
});

test('rendering sources outers', () => {
    expect(sourcesOutersWrapper.find('SourceOuter').length).toEqual(4);
    for (let i = 0; i < fsLightbox.data.sourcesCount; i++) {
        let sourceHolder;
        sourceHolder = sourcesOutersWrapper.childAt(i);
        expect(sourceHolder.equals(
            <SourceOuter
                fsLightbox={ fsLightbox }
                i={ i }
                key={ i }
            />
        )).toBeTruthy();
    }
});

