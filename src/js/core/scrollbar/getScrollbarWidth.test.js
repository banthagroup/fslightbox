import * as getOuterElementOfWidthGetterObject from "./getOuterElementOfWidthGetter";
import * as getInnerElementOfWidthGetterObject from "./getInnerElementOfWidthGetter";
import { getScrollbarWidth } from "./getScrollbarWidth";

const fsLightbox = {
    props: {
        disableLocalStorage: false
    }
};
const outer = {
    offsetWidth: 0,
    appendChild: () => {}
};
const inner = {
    offsetWidth: 0
};

test('simple actions', () => {
    getOuterElementOfWidthGetterObject.getOuterElementOfWidthGetter = jest.fn(() => outer);
    getInnerElementOfWidthGetterObject.getInnerElementOfWidthGetter = jest.fn(() => inner);
    document.body.appendChild = jest.fn();
    document.body.removeChild = jest.fn();
    outer.appendChild = jest.fn();

    getScrollbarWidth(fsLightbox);

    expect(getOuterElementOfWidthGetterObject.getOuterElementOfWidthGetter).toBeCalled();
    expect(getInnerElementOfWidthGetterObject.getInnerElementOfWidthGetter).toBeCalled();
    expect(document.body.appendChild).toBeCalledWith(outer);
    expect(outer.appendChild).toBeCalledWith(inner);
    expect(document.body.removeChild).toBeCalledWith(outer);
});

describe('returning right scrollbar width from divs or local storage', () => {
    beforeAll(() => {
        const outer = document.createElement('div');
        const inner = document.createElement('div');
        // clearing local storage to be sure that width comes from detecting service
        localStorage.clear();
        jest.spyOn(outer, 'offsetWidth', 'get').mockReturnValue(30);
        jest.spyOn(inner, 'offsetWidth', 'get').mockReturnValue(10);
        getOuterElementOfWidthGetterObject.getOuterElementOfWidthGetter = () => outer;
        getInnerElementOfWidthGetterObject.getInnerElementOfWidthGetter = () => inner;
    });

    test('retrieved from divs', () => {
        expect(getScrollbarWidth(fsLightbox)).toBe(20);
        expect(localStorage.getItem('fslightbox-scrollbar-width')).toBe('20');
    });

    describe('retrieved from local storage', () => {
        beforeEach(() => {
            localStorage.setItem('fslightbox-scrollbar-width', '200px');
        });

        test('local storage disabled', () => {
            fsLightbox.props.disableLocalStorage = true;
            expect(getScrollbarWidth(fsLightbox)).toBe(20);
            // it should also not set new width
            expect(localStorage.getItem('fslightbox-scrollbar-width')).toBe('200px');
        });

        test('local storage enabled', () => {
            delete fsLightbox.props.disableLocalStorage;
            expect(getScrollbarWidth(fsLightbox)).toBe('200px');
        });
    });
});
