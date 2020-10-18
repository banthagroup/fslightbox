import './js/core/styles/styles-injection/styles-injection';
import './js/FsLightbox';

window.fsLightboxInstances = {};

setupLightboxesFromDOM();

window.refreshFsLightbox = () => {
    for (let name in fsLightboxInstances) {
        const tempProps = fsLightboxInstances[name].props;
        fsLightboxInstances[name] = new FsLightbox();
        fsLightboxInstances[name].props = tempProps;
        fsLightboxInstances[name].props.sources = [];
        fsLightboxInstances[name].elements.a = [];
    }

    setupLightboxesFromDOM();
};

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
        setUpProp('customClasses', 'data-class');
        setUpProp('customClasses', 'data-custom-class');

        // setting up custom attributes
        const LIGHTBOX_ATTRIBUTES = ['href', 'data-fslightbox', 'data-type', 'data-video-poster', 'data-class', 'data-custom-class'];
        const attributes = a[i].attributes;
        const currentInstanceCustomAttributes = fsLightboxInstances[instanceName].props.customAttributes;
        for (let j = 0; j < attributes.length; j++) {
            if (LIGHTBOX_ATTRIBUTES.indexOf(attributes[j].name) === -1
                && attributes[j].name.substr(0, 5) === 'data-') { // if is custom attribute
                if (!currentInstanceCustomAttributes[currentIndex]) {
                    currentInstanceCustomAttributes[currentIndex] = {};
                }

                const attributeName = attributes[j].name.substr(5); // removing 'data-' from attribute
                currentInstanceCustomAttributes[currentIndex][attributeName] = attributes[j].value;
            }
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
