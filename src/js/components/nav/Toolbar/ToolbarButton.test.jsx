import React from 'react';
import { shallow } from 'enzyme/build';
import ToolbarButton from "../../../../src/components/nav/toolbar/ToolbarButton";

const mockOnClick = jest.fn();
const toolbarButton = shallow(<ToolbarButton
    onClick={ mockOnClick }
    viewBox={ '0 0 20 20' }
    size={ '26px' }
    d={ 'M1425' }
    title={ 'title' }
/>);

describe('ToolbarButton DOM', () => {
    it('should match snapshot', () => {
        expect(toolbarButton).toMatchSnapshot();
    });
});

describe('calling onClick received from props', () => {
    beforeEach(() => {
        toolbarButton.simulate('click');
    });

    it('should call ', () => {
        expect(mockOnClick).toBeCalled();
    });
});