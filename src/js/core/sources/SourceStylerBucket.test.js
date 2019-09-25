import { SourceStylerBucket } from "./SourceStylerBucket";

const fsLightbox = {
    data: { sourcesScales: [] },
    elements: { sources: [{ current: { style: {} } }] }
};
let sourceStylerBucket = new SourceStylerBucket(fsLightbox, 0, 2000, 2000);

test('ifSourcesScaledResetScale', () => {
    sourceStylerBucket.ifSourcesScaledResetScale();
    expect(fsLightbox.data.sourcesScales[0]).toBeUndefined();
    expect(fsLightbox.elements.sources[0].current.style.transform).toBeUndefined();

    fsLightbox.data.sourcesScales[0] = 1.1;
    sourceStylerBucket.ifSourcesScaledResetScale();
    expect(fsLightbox.data.sourcesScales[0]).toBe(1);
    expect(fsLightbox.elements.sources[0].current.style.transform).toBe('scale(1)');
});

test('styleSourceUsingScaleAndHeight', () => {
    const setUpSourceStylerBucketWithDimensions = (width, height) => {
        sourceStylerBucket = new SourceStylerBucket(fsLightbox, 0, width, height);
        sourceStylerBucket.ifSourcesScaledResetScale = jest.fn();
    };

    const assertSourceScale = (scale) => {
        expect(fsLightbox.data.sourcesScales[0]).toBe(scale);
        expect(fsLightbox.elements.sources[0].current.style.transform).toBe(`scale(${ scale })`);
    };

    const assertSourceScaleUndefined = () => {
        expect(fsLightbox.data.sourcesScales[0]).toBeUndefined();
        expect(fsLightbox.elements.sources[0].current.style.transform).toBeUndefined();
    };

    sourceStylerBucket.ifSourcesScaledResetScale = jest.fn();
    fsLightbox.data.sourcesScales[0] = undefined;
    fsLightbox.elements.sources[0].current.style.transform = undefined;

    setUpSourceStylerBucketWithDimensions(1000, 1500);
    innerWidth = 1500;
    innerHeight = 1000;
    sourceStylerBucket.styleSourceUsingScaleAndHeight(0.5, 500);
    assertSourceScaleUndefined();
    expect(sourceStylerBucket.ifSourcesScaledResetScale).toBeCalled();

    setUpSourceStylerBucketWithDimensions(1500, 1000);
    innerWidth = 1500;
    innerHeight = 1000;
    sourceStylerBucket.styleSourceUsingScaleAndHeight(0.5, 500);
    assertSourceScaleUndefined();
    expect(sourceStylerBucket.ifSourcesScaledResetScale).toBeCalled();

    setUpSourceStylerBucketWithDimensions(1500, 999);
    innerWidth = 1500;
    innerHeight = 1000;
    sourceStylerBucket.styleSourceUsingScaleAndHeight(0.5, 500);
    assertSourceScaleUndefined();
    expect(sourceStylerBucket.ifSourcesScaledResetScale).toBeCalled();

    setUpSourceStylerBucketWithDimensions(1000, 1500);
    innerWidth = 1000;
    innerHeight = 1500;
    sourceStylerBucket.styleSourceUsingScaleAndHeight(0.5, 500);
    assertSourceScaleUndefined();
    expect(sourceStylerBucket.ifSourcesScaledResetScale).toBeCalled();

    setUpSourceStylerBucketWithDimensions(1500, 1000);
    innerWidth = 1000;
    innerHeight = 1500;
    sourceStylerBucket.styleSourceUsingScaleAndHeight(0.5, 500);
    assertSourceScaleUndefined();
    expect(sourceStylerBucket.ifSourcesScaledResetScale).toBeCalled();

    setUpSourceStylerBucketWithDimensions(1500, 999);
    innerWidth = 1000;
    innerHeight = 1500;
    sourceStylerBucket.styleSourceUsingScaleAndHeight(0.5, 500);
    assertSourceScale(2);
    expect(sourceStylerBucket.ifSourcesScaledResetScale).not.toBeCalled();
});
