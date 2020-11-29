let firstA, secondA, thirdA, fourthA, fifthA, sixthA, seventhA, eighthA;
let customSourceFirst, customSourceSecond;

firstA = document.createElement('a');
firstA.setAttribute('data-fslightbox', 'gallery-first');
firstA.setAttribute('href', 'image/1.jpg');
document.body.appendChild(firstA);

secondA = document.createElement('a');
secondA.setAttribute('data-fslightbox', 'gallery-first');
secondA.setAttribute('data-type', 'image');
secondA.setAttribute('data-video-poster', 'img/video-poster.jpg');
secondA.setAttribute('data-custom-class', 'example-class');
secondA.setAttribute('data-poster', 'example-poster');
secondA.setAttribute('data-alt', 'example-alt');
secondA.setAttribute('class', 'just to test if not crashes with different attributes');
secondA.setAttribute('href', '#custom-source-1');
customSourceFirst = document.createElement('div');
customSourceFirst.id = 'custom-source-1';
document.body.appendChild(customSourceFirst);
document.body.appendChild(secondA);

thirdA = document.createElement('a');
thirdA.setAttribute('data-fslightbox', 'gallery-second');
thirdA.setAttribute('href', '#custom-source-2');
thirdA.setAttribute('data-custom-class', 'custom-class');
customSourceSecond = document.createElement('div');
customSourceSecond.id = 'custom-source-2';
document.body.appendChild(customSourceSecond);
document.body.appendChild(thirdA);

fourthA = document.createElement('a');
fourthA.setAttribute('data-fslightbox', 'gallery-first');
fourthA.setAttribute('href', 'image/2.jpg');
document.body.appendChild(fourthA);

fifthA = document.createElement('a');
fifthA.setAttribute('data-fslightbox', 'gallery-second');
fifthA.setAttribute('href', 'image/3.jpg');
document.body.appendChild(fifthA);

sixthA = document.createElement('a');
sixthA.setAttribute('href', 'image/4.jpg');
document.body.appendChild(sixthA);

require('../src/index.js');

test('setting up lightboxes with proper props', () => {
    expect(fsLightboxInstances['gallery-first'].props.sources).toEqual([
        'image/1.jpg', customSourceFirst, 'image/2.jpg'
    ]);
    expect(fsLightboxInstances['gallery-second'].props.sources).toEqual([
        customSourceSecond, 'image/3.jpg'
    ]);
    expect(fsLightboxInstances['gallery-first'].elements.a).toEqual([
        firstA, secondA, fourthA
    ]);
    expect(fsLightboxInstances['gallery-second'].elements.a).toEqual([
        thirdA, fifthA
    ]);
    expect(fsLightboxInstances['gallery-first'].props.types[1]).toBe('image');
    expect(fsLightboxInstances['gallery-first'].props.videosPosters[1]).toBe('img/video-poster.jpg');
    expect(fsLightboxInstances['gallery-first'].props.customClasses[1]).toBe('example-class');
    expect(fsLightboxInstances['gallery-first'].props.customAttributes).toEqual([
        undefined,
        {
            poster: 'example-poster',
            alt: 'example-alt'
        }
    ]);
    expect(fsLightboxInstances['gallery-first']).toBeInstanceOf(FsLightbox);
    expect(fsLightboxInstances['gallery-second']).toBeInstanceOf(FsLightbox);
    expect(fsLightbox).toBe(fsLightboxInstances['gallery-second']);
});

test('opening lightbox via <a> tag click', () => {
    fsLightboxInstances['gallery-first'].open = jest.fn();
    const event = new Event('click');
    event.preventDefault = jest.fn();
    fourthA.dispatchEvent(event);
    expect(event.preventDefault).toBeCalled();
    expect(fsLightboxInstances['gallery-first'].open).toBeCalledWith(2);
});

test('testing refreshing lightboxes - on opened one', () => {
    fsLightboxInstances['gallery-second'].open();
    thirdA.setAttribute('href', 'invalid-updated');
    thirdA.setAttribute('data-custom-class', 'updated-custom-class');
    const seventhA = document.createElement('a');
    seventhA.setAttribute('data-fslightbox', 'gallery-second');
    seventhA.setAttribute('href', 'image/5.jpg');
    document.body.appendChild(seventhA);
    // test adding new gallery
    const eighthA = document.createElement('a');
    eighthA.setAttribute('data-fslightbox', 'gallery-third');
    eighthA.setAttribute('href', 'image/6.jpg');
    document.body.appendChild(eighthA);

    fsLightboxInstances['gallery-second'].props.videosPosters = ['video poster should not be cleared'];
    refreshFsLightbox();
    expect(fsLightboxInstances['gallery-second'].props.sources).toEqual([
        'invalid-updated', 'image/3.jpg', 'image/5.jpg'
    ]);
    expect(fsLightboxInstances['gallery-second'].props.videosPosters).toEqual(['video poster should not be cleared']);
    expect(fsLightboxInstances['gallery-second'].props.customClasses).toEqual(['updated-custom-class']); // testing replaced prop
    expect(fsLightboxInstances['gallery-third'].props.sources).toEqual(['image/6.jpg']);
});