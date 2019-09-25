import React from 'react';
import { SourceOuterTransformer } from "../transforms/SourceOuterTransformer";
import { getSourcesHoldersTransformersCollection } from "./getSourcesHoldersTransformersCollection";

const fsLightbox = {
    elements: {
        sourcesOuters: []
    },
    resolve: (constructorDependency) => {
        if (constructorDependency === SourceOuterTransformer) {
            resolveCalls++;
            return sourcesHoldersTransformingFacades[resolveCalls - 1];
        }
    }
};

let resolveCalls = 0;
const sourcesHoldersTransformingFacades = [];

for (let i = 0; i < 15; i++) {
    sourcesHoldersTransformingFacades[i] = {
        setSourceHolder: jest.fn()
    };
}

const sourcesOuters = fsLightbox.elements.sourcesOuters;

for (let i = 0; i < 15; i++) {
    sourcesOuters[i] = React.createRef();
}

const retrievedCollection = getSourcesHoldersTransformersCollection(fsLightbox);

it('should call setSourceHolder with correct param on each SourceOuterTransformer', () => {
    for (let i = 0; i < 15; i++) {
        expect(sourcesHoldersTransformingFacades[i].setSourceHolder).toBeCalledWith(sourcesOuters[i]);
    }
});

it('should return array containing SourceOuterTransformer intances', () => {
    const expectedArray = [];
    for (let i = 0; i < 15; i++) {
        expectedArray.push(sourcesHoldersTransformingFacades[i]);
    }
    expect(retrievedCollection).toEqual(expectedArray);
});
