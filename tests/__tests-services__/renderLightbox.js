export function renderLightbox() {
    let a = document.createElement('a');
    a.setAttribute('data-fslightbox', 'gallery');
    a.setAttribute('href', 'https://i.imgur.com/Ys15LQF.jpg');
    document.body.appendChild(a);

    a = document.createElement('a');
    a.setAttribute('data-fslightbox', 'gallery');
    a.setAttribute('href', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
    document.body.appendChild(a);

    a = document.createElement('a');
    a.setAttribute('data-fslightbox', 'gallery');
    a.setAttribute('href', 'https://www.youtube.com/watch?v=jNQXAC9IVRw');
    document.body.appendChild(a);

    const customSource = document.createElement('div');
    customSource.id = 'custom-source';
    customSource.className = 'hidden';
    document.body.appendChild(customSource);
    a = document.createElement('a');
    a.setAttribute('data-fslightbox', 'gallery');
    a.setAttribute('href', '#custom-source');
    document.body.appendChild(a);

    a = document.createElement('a');
    a.setAttribute('data-fslightbox', 'gallery');
    a.setAttribute('href', 'invalid');
    document.body.appendChild(a);

    require('../../src/index');
}
