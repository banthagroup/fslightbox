import { getClientXFromEvent } from "./getClientXFromEvent";

test('touch event', () => {
    expect(getClientXFromEvent({
        touches: [
            {
                clientX: 100
            }
        ],
        clientX: 200
    })).toBe(100);
});

test('mouse event', () => {
    expect(getClientXFromEvent({
        clientX: 500
    })).toBe(500);
});
