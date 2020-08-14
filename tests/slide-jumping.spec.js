import { renderLightbox } from "./__tests-services__/renderLightbox";

const keydownEvent = new Event('keydown');

test('slide-jumping', () => {
    renderLightbox();
    fsLightbox.open(3);
    expect(fsLightbox.stageIndexes).toEqual({ previous: 2, current: 3, next: 4 });

    keydownEvent.key = 'ArrowRight';
    document.dispatchEvent(keydownEvent);
    expect(fsLightbox.stageIndexes).toEqual({ previous: 3, current: 4, next: 0 });

    document.getElementsByClassName('fslightbox-slide-btn-container')[1].dispatchEvent(new Event('click'));
    expect(fsLightbox.stageIndexes).toEqual({ previous: 4, current: 0, next: 1 });

    document.getElementsByClassName('fslightbox-slide-btn-container')[0].dispatchEvent(new Event('click'));
    expect(fsLightbox.stageIndexes).toEqual({ previous: 3, current: 4, next: 0 });
});
