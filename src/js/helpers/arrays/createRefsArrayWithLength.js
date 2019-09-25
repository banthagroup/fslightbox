import React from 'react';

export function createRefsArrayWithLength(number){
    const refsArray = [];
    for (let i = 0; i < number; i++) {
        refsArray.push(React.createRef());
    }
    return refsArray;
}
