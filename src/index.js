import './js/FsLightbox';

window.fsLightboxInstances = {};

const a = document.getElementsByTagName('a');

for (let i = 0; i < a.length; i++) {
    if (!a[i].hasAttribute('data-fslightbox')) {
        continue;
    }

    const instanceName = a[i].getAttribute('data-fslightbox');
    const href = a[i].getAttribute('href');

    if (!fsLightboxInstances[instanceName]) {
        fsLightboxInstances[instanceName] = new FsLightbox();
    }

    let source = null;
    (href.charAt(0) === '#') ?
        source = document.getElementById(href.substring(1)) :
        source = href;

    fsLightboxInstances[instanceName].props.sources.push(source);
    fsLightboxInstances[instanceName].elements.a.push(a[i]);

    const currentIndex = fsLightboxInstances[instanceName].props.sources.length - 1;

    a[i].onclick = () => fsLightboxInstances[instanceName].open(currentIndex);

    setUpProp('types', 'data-type');
    setUpProp('videosPosters', 'data-video-poster');
    setUpProp('maxWidths', 'data-max-width');
    setUpProp('maxHeights', 'data-max-height');

    function setUpProp(propName, attributeName) {
        if (a[i].hasAttribute(attributeName)) {
            fsLightboxInstances[instanceName].props[propName][currentIndex] = a[i].getAttribute(attributeName);
        }
    }
}

const fsLightboxKeys = Object.keys(fsLightboxInstances);
window.fsLightbox = fsLightboxInstances[fsLightboxKeys[fsLightboxKeys.length - 1]];
