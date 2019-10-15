test('one-source', () => {
    const keydownEvent = new Event('keydown');

    const a = document.createElement('a');
    a.setAttribute('data-fslightbox', 'gallery');
    a.setAttribute('href', 'https://i.imgur.com/Ys15LQF.jpg');
    document.body.appendChild(a);

    require('../src/index');

    fsLightboxInstances['gallery'].open();
    keydownEvent.keyCode = 37;
    document.dispatchEvent(keydownEvent);
    keydownEvent.keyCode = 39;
    document.dispatchEvent(keydownEvent);
    fsLightboxInstances['gallery'].close();
});
