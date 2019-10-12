import './js/core/styles/styles-injection/styles-injection';
import './js/FsLightbox';

window.fsLightboxInstances = {};

function setupLightboxesFromDOM() {
    const a = document.getElementsByTagName('a');

    for (let i = 0; i < a.length; i++) {
        if (!a[i].hasAttribute('data-fslightbox')) {
            continue;
        }

        const instanceName = a[i].getAttribute('data-fslightbox');
        const href = a[i].getAttribute('href');

        if (!fsLightboxInstances[instanceName]) {
            fsLightboxInstances[instanceName] = new FsLightbox();
            fsLightboxInstances[instanceName].setup();
        }

        let source = null;
        (href.charAt(0) === '#') ?
            source = document.getElementById(href.substring(1)) :
            source = href;

        fsLightboxInstances[instanceName].props.sources.push(source);
        fsLightboxInstances[instanceName].elements.a.push(a[i]);

        const currentIndex = fsLightboxInstances[instanceName].props.sources.length - 1;

        a[i].onclick = (e) => {
            e.preventDefault();
            fsLightboxInstances[instanceName].open(currentIndex);
        };

        setUpProp('types', 'data-type');
        setUpProp('videosPosters', 'data-video-poster');
        setUpProp('customClasses', 'data-custom-class');

        if (a[i].hasAttribute('data-width')) {
            fsLightboxInstances[instanceName].props.maxYoutubeDimensions = {
                width: parseInt(a[i].getAttribute('data-width')),
                height: parseInt(a[i].getAttribute('data-height'))
            };
        }

        function setUpProp(propName, attributeName) {
            if (a[i].hasAttribute(attributeName)) {
                fsLightboxInstances[instanceName].props[propName][currentIndex] = a[i].getAttribute(attributeName);
            }
        }
    }

    const fsLightboxKeys = Object.keys(fsLightboxInstances);
    window.fsLightbox = fsLightboxInstances[fsLightboxKeys[fsLightboxKeys.length - 1]];
}


window.updateFsLightbox = () => {
    for (let name in fsLightboxInstances) {
        const tempProps = fsLightboxInstances[name].props;
        fsLightboxInstances[name] = new FsLightbox();
        fsLightboxInstances[name].props = tempProps;
        fsLightboxInstances[name].props.sources = [];
        fsLightboxInstances[name].elements.a = [];
        fsLightboxInstances[name].setup();
    }

    setupLightboxesFromDOM();
};

setupLightboxesFromDOM();
