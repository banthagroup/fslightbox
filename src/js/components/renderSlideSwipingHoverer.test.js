import { renderSlideSwipingHoverer } from "./renderSlideSwipingHoverer";

const fsLightbox = { elements: { slideSwipingHoverer: null } };

const el = document.createElement('div');
document.createElement = () => el;

test('renderSlideSwipingHoverer', () => {
    renderSlideSwipingHoverer(fsLightbox);
    expect(fsLightbox.elements.slideSwipingHoverer).toBe(el);
});
