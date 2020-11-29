import { SourceMainWrapperTransformer } from "./SourceMainWrapperTransformer";

const fsLightbox = {
    elements: { sourceMainWrappers: [document.createElement('div')] },
    props: {}
};
// window width for all tests is 1000
window.innerWidth = 1000;
const sourceMainWrapperTransformer = new SourceMainWrapperTransformer(fsLightbox, 0);
// slide distance for all tests is .4
fsLightbox.props.slideDistance = .4;

describe('default transforming (depends on window width and slide distance)', () => {
    test('negative', () => {
        sourceMainWrapperTransformer.negative();
        expect(fsLightbox.elements.sourceMainWrappers[0].style.transform).toEqual('translateX(-1400px)');
    });

    test('zero', () => {
        sourceMainWrapperTransformer.zero();
        expect(fsLightbox.elements.sourceMainWrappers[0].style.transform).toEqual('translateX(0px)');
    });

    test('positive', () => {
        sourceMainWrapperTransformer.positive();
        expect(fsLightbox.elements.sourceMainWrappers[0].style.transform).toEqual('translateX(1400px)');
    });
});

describe('transforming by value (depends on give value, window width, and slide distance)', () => {
    test('negative', () => {
        sourceMainWrapperTransformer.byValue(100).negative();
        expect(fsLightbox.elements.sourceMainWrappers[0].style.transform).toEqual('translateX(-1300px)');
    });

    test('zero', () => {
        sourceMainWrapperTransformer.byValue(100).zero();
        expect(fsLightbox.elements.sourceMainWrappers[0].style.transform).toEqual('translateX(100px)');
    });

    test('zero', () => {
        sourceMainWrapperTransformer.byValue(100).positive();
        expect(fsLightbox.elements.sourceMainWrappers[0].style.transform).toEqual('translateX(1500px)');
    });
});
