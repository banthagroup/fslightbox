test('opening lightbox with one custom source, closing, refreshing, opening again', async () => {
    jest.useFakeTimers();

    const customSource = document.createElement('div');
    customSource.setAttribute('id', 'custom-source');
    document.body.appendChild(customSource);

    const a = document.createElement('a');
    a.setAttribute('data-fslightbox', 'gallery');
    a.setAttribute('href', '#custom-source');
    document.body.appendChild(a);

    await import('../../src/index.js');

    a.dispatchEvent(new Event('click'));

    document.getElementsByClassName('fslightbox-toolbar-button')[1].dispatchEvent(new Event('click'));
    jest.runAllTimers();

    refreshFsLightbox();

    a.dispatchEvent(new Event('click'));
});
