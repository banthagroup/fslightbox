import { getSourcesCount } from "./getSourcesCount";

const fsLightbox = { props: { sources: [1, 2] } };

test('getting sources count', () => {
    expect(getSourcesCount(fsLightbox)).toBe(2);

    delete fsLightbox.props.sources;
    fsLightbox.props.customSources = [1, 2, 3];
    expect(getSourcesCount(fsLightbox)).toBe(3);

    fsLightbox.props.sources = [1, 2, 3, 4];
    expect(getSourcesCount(fsLightbox)).toBe(4);

    fsLightbox.props.customSources = [1, 2, 3, 4, 5];
    expect(getSourcesCount(fsLightbox)).toBe(5);
}); 
