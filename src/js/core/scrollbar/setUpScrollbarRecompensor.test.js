import { setUpScrollbarRecompensor } from "./setUpScrollbarRecompensor";

const scrollbarRecompensor = {};
const fsLightbox = {
    data: {
        scrollbarWidth: 0
    },
    core: {
        scrollbarRecompensor: scrollbarRecompensor
    }
};

describe('addRecompense - adding margin right to document element', () => {
    beforeAll(() => {
        window.innerHeight = 100;
        // by default testing that window is loading
        jest.spyOn(document, 'readyState', 'get').mockReturnValue('loading');
        fsLightbox.data.scrollbarWidth = 50;
    });

    test('body offsetHeight is lower than window height', () => {
        jest.spyOn(document.body, 'offsetHeight', 'get').mockReturnValue(50);
        document.body.style.marginRight = '15px';
        setUpScrollbarRecompensor(fsLightbox);
        scrollbarRecompensor.addRecompense();

        // dispatching loading at start margin right shouldn't be added anyway
        dispatchEvent(new Event('load'));

        expect(document.body.style.marginRight).toBe('15px');
    });

    describe('body offsetHeight is bigger than window height', () => {
        beforeAll(() => {
            jest.spyOn(document.body, 'offsetHeight', 'get').mockReturnValue(150);
            document.body.style.marginRight = '15px';
            setUpScrollbarRecompensor(fsLightbox);
            scrollbarRecompensor.addRecompense();
        });

        test('window has not loaded', () => {
            expect(document.body.style.marginRight).toBe('15px');
        });

        test('window has loaded', () => {
            dispatchEvent(new Event('load'));
            expect(document.body.style.marginRight).toBe('50px');
        });
    });
});


describe('removeRecompense - removing margin right from document element', () => {
    beforeAll(() => {
        document.body.style.marginRight = '10px';
        setUpScrollbarRecompensor(fsLightbox);
        scrollbarRecompensor.removeRecompense();
    });

    it('should set margin right on document element ot 0px', () => {
        expect(document.body.style.marginRight).toBe("");
    });
});
