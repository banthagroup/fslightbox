import { renderSlideNumber } from "./renderSlideNumber";

const fsLightbox = {
    componentsServices: { setSlideNumber: null },
    props: { sources: { length: 5 } },
    stageIndexes: { current: 0 }
};

const parent = document.createElement('div');

test('renderSlideNumber', () => {
    renderSlideNumber(fsLightbox, parent);
    expect(parent.firstChild.firstChild.children[2].innerHTML).toBe('5');

    fsLightbox.componentsServices.setSlideNumber(3);
    expect(parent.firstChild.firstChild.children[0].innerHTML).toBe('3');
});
