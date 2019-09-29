import { renderVideo } from "./renderVideo";

const fsLightbox = {
    collections: { sourcesLoadsHandlers: [null, { handleVideoLoad: jest.fn() }] },
    elements: { sources: [], sourcesInners: [null, { appendChild: jest.fn() }] },
    props: { sources: [null, 'image/1.jpg'], videosPosters: [] }
};

const video = document.createElement('video');
const source = document.createElement('source');
document.createElement = (el) => {
    return (el === 'video') ? video : source;
};

test('renderVideo', () => {
    renderVideo(fsLightbox, 1);
    expect(fsLightbox.elements.sources[1]).toBe(video);
    expect(video.contains(source)).toBeTruthy();
    expect(fsLightbox.elements.sourcesInners[1].appendChild).toBeCalledWith(video);
    video.dispatchEvent(new Event('loadedmetadata'));
    expect(fsLightbox.collections.sourcesLoadsHandlers[1].handleVideoLoad).toBeCalled();

    fsLightbox.props.videosPosters = [null, 'https://www.google.com/'];
    renderVideo(fsLightbox, 1);
    expect(fsLightbox.elements.sources[1].poster).toBe('https://www.google.com/')
});
