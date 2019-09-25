import { getAnimationDebounce } from "./getAnimationDebounce";

window.requestAnimationFrame = jest.fn();
const canRunNextAnimation = getAnimationDebounce();

it('should return true due to animation is not running', () => {
    expect(canRunNextAnimation()).toBe(true);
});

it('should return false due to animation is running', () => {
    expect(canRunNextAnimation()).toBe(false);
});

it('should return true due to animation is not running again', () => {
    // ending animation
    window.requestAnimationFrame.mock.calls[0][0]();
    expect(canRunNextAnimation()).toBe(true);
});
