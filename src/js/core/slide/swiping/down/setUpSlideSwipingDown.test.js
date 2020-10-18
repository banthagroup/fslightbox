import { setUpSlideSwipingDown } from "./setUpSlideSwipingDown";
import { SOURCE_MAIN_WRAPPERS } from "../../../../constants/elements";
import { TRANSFORM_TRANSITION_CLASS_NAME } from "../../../../constants/classes-names";
import * as getClientXFromEventObject from "../../../../helpers/events/getClientXFromEvent";

const fsLightbox = {
    core: {
        classFacade: { removeFromEachElementClassIfContains: jest.fn() },
        slideSwipingDown: {},
    },
    elements: { sources: [null, { contains: jest.fn(() => false) }] },
    slideSwipingProps: {},
    stageIndexes: { current: 0 }
};
const slideSwipingDown = fsLightbox.core.slideSwipingDown;
const e = {
    target: {},
    touches: [],
    preventDefault: jest.fn()
};

getClientXFromEventObject.getClientXFromEvent = jest.fn(() => 'client-x');

setUpSlideSwipingDown(fsLightbox);

test('listener', () => {
    e.target.tagName = 'VIDEO';
    slideSwipingDown.listener(e);
    expect(fsLightbox.slideSwipingProps.isSwiping).toBe(true);
    expect(fsLightbox.slideSwipingProps.swipedX).toBe(0);
    expect(getClientXFromEventObject.getClientXFromEvent).toBeCalledWith(e);
    expect(fsLightbox.slideSwipingProps.downClientX).toBe('client-x');
    expect(e.preventDefault).not.toBeCalled();
    expect(fsLightbox.slideSwipingProps.isSourceDownEventTarget).toBe(false);
    expect(fsLightbox.core.classFacade.removeFromEachElementClassIfContains).toBeCalledWith(
        SOURCE_MAIN_WRAPPERS, TRANSFORM_TRANSITION_CLASS_NAME
    );

    e.touches = [{ clientX: 0 }];
    e.target.tagName = 'IMAGE';
    fsLightbox.stageIndexes.current = 1;
    slideSwipingDown.listener(e);
    expect(e.preventDefault).not.toBeCalled();
    expect(fsLightbox.elements.sources[1].contains).toBeCalledWith(e.target);
    expect(fsLightbox.slideSwipingProps.isSourceDownEventTarget).toBe(false);

    e.target.tagName = 'VIDEO';
    fsLightbox.elements.sources[1].contains = () => true;
    slideSwipingDown.listener(e);
    expect(e.preventDefault).not.toBeCalled();
    expect(fsLightbox.slideSwipingProps.isSourceDownEventTarget).toBe(true);

    e.target.tagName = 'IMAGE';
    e.touches = undefined;
    slideSwipingDown.listener(e);
    expect(e.preventDefault).toBeCalled();
});
