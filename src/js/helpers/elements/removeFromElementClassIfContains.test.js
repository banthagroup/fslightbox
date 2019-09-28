import { removeFromElementClassIfContains } from "./removeFromElementClassIfContains";

const element = {
    classList: {
        contains: (className) => {
            if (className === 'class-name') {
                return contains;
            }
        },
        remove: jest.fn()
    }
};
let contains;

test('removeFromElementClassIfContains', () => {
    contains = false;
    removeFromElementClassIfContains(element, 'class-name');
    expect(element.classList.remove).not.toBeCalled();

    contains = true;
    removeFromElementClassIfContains(element, 'class-name');
    expect(element.classList.remove).toBeCalledWith('class-name');
});
