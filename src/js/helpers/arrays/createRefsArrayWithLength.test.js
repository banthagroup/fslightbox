import React from 'react';
import { createRefsArrayWithLength } from "../../../src/helpers/arrays/createRefsArrayWithLength";

test('returning array filled with refs', () => {
    expect(createRefsArrayWithLength(4)).toEqual([
        React.createRef(),
        React.createRef(),
        React.createRef(),
        React.createRef()
    ]);
});
