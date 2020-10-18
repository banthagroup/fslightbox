import { SourceSizer } from "./SourceSizer";

const fsLightbox = {
    data: {},
    elements: { sources: [{ style: {} }], },
};
const sourceStyler = new SourceSizer(fsLightbox, 0, 2000, 2000);

test('adjustSize', () => {
    const assertDimensions = (width, height) => {
        expect(fsLightbox.elements.sources[0].style.width).toBe(width + 'px');
        expect(fsLightbox.elements.sources[0].style.height).toBe(height + 'px');
    };

    fsLightbox.data.maxSourceWidth = 1500;
    fsLightbox.data.maxSourceHeight = 1400;
    sourceStyler.adjustSize();
    assertDimensions(1400, 1400);

    fsLightbox.data.maxSourceWidth = 1500;
    fsLightbox.data.maxSourceHeight = 2500;
    sourceStyler.adjustSize();
    assertDimensions(1500, 1500);

    fsLightbox.data.maxSourceWidth = 2500;
    fsLightbox.data.maxSourceHeight = 1500;
    sourceStyler.adjustSize();
    assertDimensions(1500, 1500);

    fsLightbox.data.maxSourceWidth = 2500;
    fsLightbox.data.maxSourceHeight = 2400;
    sourceStyler.adjustSize();
    assertDimensions(2000, 2000);
});
