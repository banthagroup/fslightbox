import { SlideSwipingMoveActioner } from "./SlideSwipingMoveActioner";
import { CURSOR_GRABBING_CLASS_NAME } from "../../../../constants/classes-names";
import * as getClientXFromEventObject from "../../../../helpers/events/getClientXFromEvent";
import * as addToElementClassIfNotContainsObject from "../../../../helpers/elements/addToElementClassIfNotContains";

const fsLightbox = {
    collections: {
        sourceMainWrappersTransformers: [
            {
                byValue: () => ({
                    negative: () => {},
                    zero: () => {},
                    positive: () => {}
                })
            }
        ]
    },
    elements: {
        container: { classList: { add: jest.fn() }, appendChild: jest.fn(), contains: jest.fn(() => true) },
        slideSwipingHoverer: 'slide-swiping-hoverer'
    },
    slideSwipingProps: { downClientX: null, swipedX: null, },
    stageIndexes: {
        previous: 0,
        current: 0,
        next: 0
    }
};
let slideSwipingMoveActions;
addToElementClassIfNotContainsObject.addToElementClassIfNotContains = jest.fn();

const setUpAndCallRunActionsForEventWithEmptyEvent = () => {
    slideSwipingMoveActions = new SlideSwipingMoveActioner(fsLightbox);
    slideSwipingMoveActions.runActionsForEvent({});
};

test('simple actions', () => {
    const e = {};

    fsLightbox.slideSwipingProps.downClientX = 500;
    getClientXFromEventObject.getClientXFromEvent = (event) => {
        if (Object.is(event, e)) {
            return 450;
        }
    };
    slideSwipingMoveActions = new SlideSwipingMoveActioner(fsLightbox);
    slideSwipingMoveActions.runActionsForEvent(e);

    expect(fsLightbox.elements.container.contains).toBeCalledWith('slide-swiping-hoverer');
    expect(fsLightbox.elements.container.appendChild).not.toBeCalled();
    expect(addToElementClassIfNotContainsObject.addToElementClassIfNotContains)
        .toBeCalledWith(fsLightbox.elements.container, CURSOR_GRABBING_CLASS_NAME);
    expect(fsLightbox.slideSwipingProps.swipedX).toBe(-50);

    fsLightbox.elements.container.contains = () => false;
    setUpAndCallRunActionsForEventWithEmptyEvent();
    expect(fsLightbox.elements.container.appendChild).toBeCalledWith('slide-swiping-hoverer');
});

describe('transforming stage sources holders by swiped difference value', () => {
    let negative;
    let zero;
    let positive;
    let expectedByValue;

    const setUpTransformMockFunctions = () => {
        negative = jest.fn();
        zero = jest.fn();
        positive = jest.fn();
    };

    beforeAll(() => {
        fsLightbox.collections.sourceMainWrappersTransformers[3] = {
            byValue: (value) => {
                if (value === expectedByValue) {
                    return {
                        negative: negative
                    }
                }
            }
        };
        fsLightbox.collections.sourceMainWrappersTransformers[5] = {
            byValue: (value) => {
                if (value === expectedByValue) {
                    return {
                        zero: zero
                    }
                }
            }
        };
        fsLightbox.collections.sourceMainWrappersTransformers[9] = {
            byValue: (value) => {
                if (value === expectedByValue) {
                    return {
                        positive: positive
                    }
                }
            }
        };
    });

    describe('new slide current source holder', () => {
        beforeAll(() => {
            getClientXFromEventObject.getClientXFromEvent = () => 750;
            fsLightbox.slideSwipingProps.downClientX = 350;
            expectedByValue = 400;

            fsLightbox.stageIndexes = {
                current: 5
            };
            setUpTransformMockFunctions();
            setUpAndCallRunActionsForEventWithEmptyEvent();
        });

        it('should call zero', () => {
            expect(zero).toBeCalled();
        });
    });

    describe('new slide previous source holder', () => {
        test('there is no previous stage index - negative should not be called', () => {
            fsLightbox.stageIndexes = {
                current: 5
            };
            setUpTransformMockFunctions();
            setUpAndCallRunActionsForEventWithEmptyEvent();

            expect(negative).not.toBeCalled();
        });

        test('client is swiping forward - previous source holder should not be transformed', () => {
            getClientXFromEventObject.getClientXFromEvent = () => 100;
            fsLightbox.slideSwipingProps.downClientX = 400;
            expectedByValue = -300;

            fsLightbox.stageIndexes = {
                previous: 3,
                current: 5
            };

            setUpTransformMockFunctions();
            setUpAndCallRunActionsForEventWithEmptyEvent();

            expect(negative).not.toBeCalled();
        });

        test('client is swiping backward - previous source holder should be transfored', () => {
            getClientXFromEventObject.getClientXFromEvent = () => 500;
            fsLightbox.slideSwipingProps.downClientX = 400;
            expectedByValue = 100;

            fsLightbox.stageIndexes = {
                previous: 3,
                current: 5
            };

            setUpTransformMockFunctions();
            setUpAndCallRunActionsForEventWithEmptyEvent();

            expect(negative).toBeCalled();
        });
    });


    describe('new slide next source holder', () => {
        test('there is no next stage index - positive should not be called', () => {
            fsLightbox.stageIndexes = {
                current: 5
            };
            setUpTransformMockFunctions();
            setUpAndCallRunActionsForEventWithEmptyEvent();

            expect(positive).not.toBeCalled();
        });

        test('client is swiping backward - next source holder should not be transformed', () => {
            getClientXFromEventObject.getClientXFromEvent = () => 500;
            fsLightbox.slideSwipingProps.downClientX = 250;
            expectedByValue = 250;

            fsLightbox.stageIndexes = {
                current: 5,
                next: 9
            };

            setUpTransformMockFunctions();
            setUpAndCallRunActionsForEventWithEmptyEvent();

            expect(positive).not.toBeCalled();
        });

        test('client is swiping forward - next source holder should be transformed', () => {
            getClientXFromEventObject.getClientXFromEvent = () => 400;
            fsLightbox.slideSwipingProps.downClientX = 1000;
            expectedByValue = -600;

            fsLightbox.stageIndexes = {
                current: 5,
                next: 9
            };

            setUpTransformMockFunctions();
            setUpAndCallRunActionsForEventWithEmptyEvent();

            expect(positive).toBeCalled();
        });
    })
});
