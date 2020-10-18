import { renderLightbox } from "./__tests-services__/renderLightbox";
import { ABSOLUTED_CLASS_NAME, FULL_DIMENSION_CLASS_NAME } from "../src/js/constants/classes-names";

let sourceWrappersContainer;
const mousedown = new Event('mousedown');
const mousemove = new Event('mousemove');
const mouseup = new Event('mouseup');

beforeAll(() => {
    renderLightbox();
    fsLightbox.open(0);
    jest.useFakeTimers();

    const containerChildren = document.getElementsByClassName('fslightbox-container')[0].children;
    for (let i = 0; i < containerChildren.length; i++) {
        if (containerChildren[i].classList.contains(ABSOLUTED_CLASS_NAME) && containerChildren[i].classList.contains(FULL_DIMENSION_CLASS_NAME)) {
            sourceWrappersContainer = containerChildren[i];
        }
    }

    window.requestAnimationFrame = (callback) => callback();
});

test('slide swiping', () => {
    // backward
    mousedown.clientX = 100;
    sourceWrappersContainer.dispatchEvent(mousedown);
    mousemove.clientX = 200;
    document.dispatchEvent(mousemove);
    document.dispatchEvent(mouseup);
    jest.runTimersToTime(250);
    expect(fsLightbox.stageIndexes).toEqual({ previous: 3, current: 4, next: 0 });

    // forward
    mousedown.clientX = 300;
    sourceWrappersContainer.dispatchEvent(mousedown);
    mousemove.clientX = 299;
    document.dispatchEvent(mousemove);
    document.dispatchEvent(mouseup);
    jest.runTimersToTime(250);
    expect(fsLightbox.stageIndexes).toEqual({ previous: 4, current: 0, next: 1 });

    // closing
    fsLightbox.props.onClose = jest.fn();
    mousedown.clientX = 300;
    sourceWrappersContainer.dispatchEvent(mousedown);
    mousemove.clientX = 300;
    document.dispatchEvent(mousemove);
    document.dispatchEvent(mouseup);
    jest.runTimersToTime(250);
    expect(fsLightbox.props.onClose).toBeCalled();
});
