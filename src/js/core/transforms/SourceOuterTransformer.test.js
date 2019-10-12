import { SourceOuterTransformer } from "./SourceOuterTransformer";

const fsLightbox = {
    elements: { sourcesOuters: [document.createElement('div')] },
    props: {}
};
// window width for all tests is 1000
window.innerWidth = 1000;
const sourceHolderTransformer = new SourceOuterTransformer(fsLightbox, 0);
// slide distance for all tests is .4
fsLightbox.props.slideDistance = .4;

describe('default transforming (depends on window width and slide distance)', () => {
    test('negative', () => {
        sourceHolderTransformer.negative();
        expect(fsLightbox.elements.sourcesOuters[0].style.transform).toEqual('translateX(-1400px)');
    });

    test('zero', () => {
        sourceHolderTransformer.zero();
        expect(fsLightbox.elements.sourcesOuters[0].style.transform).toEqual('translateX(0px)');
    });

    test('positive', () => {
        sourceHolderTransformer.positive();
        expect(fsLightbox.elements.sourcesOuters[0].style.transform).toEqual('translateX(1400px)');
    });
});

describe('transforming by value (depends on give value, window width, and slide distance)', () => {
    test('negative', () => {
        sourceHolderTransformer.byValue(100).negative();
        expect(fsLightbox.elements.sourcesOuters[0].style.transform).toEqual('translateX(-1300px)');
    });

    test('zero', () => {
        sourceHolderTransformer.byValue(100).zero();
        expect(fsLightbox.elements.sourcesOuters[0].style.transform).toEqual('translateX(100px)');
    });

    test('zero', () => {
        sourceHolderTransformer.byValue(100).positive();
        expect(fsLightbox.elements.sourcesOuters[0].style.transform).toEqual('translateX(1500px)');
    });
});
