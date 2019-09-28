import { addToElementClassIfNotContains } from "./addToElementClassIfNotContains";

const element = {
    classList: {
        contains: (className) => {
            if (className === 'class-name') {
                return contains;
            }
        },
        add: jest.fn()
    }
};
let contains;

test('addToElementClassIfNotContains', () => {
    contains = true;
    addToElementClassIfNotContains(element, 'class-name');
    expect(element.classList.add).not.toBeCalled();

    contains = false;
    addToElementClassIfNotContains(element, 'class-name');
    expect(element.classList.add).toBeCalledWith('class-name');
});
