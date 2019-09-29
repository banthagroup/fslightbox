import { assignToObject } from "./assignToObject";

const firstObject = {
    property1: 1,
    property2: 2
};

const secondObject = {
    property3: 3,
    property4: 4,
};

it('should append properties from second object to first', () => {
    assignToObject(firstObject, secondObject);
    expect(firstObject).toEqual({
        property1: 1,
        property2: 2,
        property3: 3,
        property4: 4
    });
});
