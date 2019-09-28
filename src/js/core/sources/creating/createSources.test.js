import { CreatingSourcesLocalStorageManager } from "./CreatingSourcesLocalStorageManager";
import { DetectedTypeActioner } from "../types/DetectedTypeActioner";
import { CreatingSourcesBucket } from "./CreatingSourcesBucket";
import { createSources } from "./createSources";
import { CUSTOM_TYPE } from "../../../constants/core-constants";

const fsLightbox = {
    props: {
        sources: [document.createElement('div'), 'second-source', 'third-source', 'fourth-source'],
    },
    resolve: (constructor, dependencies) => {
        if (constructor === CreatingSourcesLocalStorageManager) {
            return localStorageManager;
        } else if (constructor === DetectedTypeActioner) {
            return detectedTypeActioner;
        } else if (constructor === CreatingSourcesBucket
            && Object.is(dependencies[0], localStorageManager)
            && Object.is(dependencies[1], detectedTypeActioner)) {
            return creatingSourcesBucket;
        } else throw new Error('Invalid dependency');
    }
};
const localStorageManager = {
    getSourceTypeFromLocalStorageByUrl: jest.fn((url) => {
        if (url === 'third-source') {
            return 'type-from-local-storage';
        }
    })
};
const detectedTypeActioner = { runActionsForSourceTypeAndIndex: jest.fn() };
const creatingSourcesBucket = {
    getTypeSetByClientForIndex: jest.fn((i) => {
        if (i === 1) {
            return 'type-set-by-client';
        }
    }), retrieveTypeWithXhrForIndex: jest.fn()
};

createSources(fsLightbox);

test('retrieving types', () => {
    expect(detectedTypeActioner.runActionsForSourceTypeAndIndex).toHaveBeenNthCalledWith(1, CUSTOM_TYPE, 0);
    expect(creatingSourcesBucket.retrieveTypeWithXhrForIndex).not.toBeCalledWith(0);

    expect(detectedTypeActioner.runActionsForSourceTypeAndIndex).toHaveBeenNthCalledWith(2, 'type-set-by-client', 1);
    expect(creatingSourcesBucket.retrieveTypeWithXhrForIndex).not.toBeCalledWith(1);

    expect(detectedTypeActioner.runActionsForSourceTypeAndIndex).toHaveBeenNthCalledWith(3, 'type-from-local-storage', 2);
    expect(creatingSourcesBucket.retrieveTypeWithXhrForIndex).not.toBeCalledWith(2);

    expect(detectedTypeActioner.runActionsForSourceTypeAndIndex).toBeCalledTimes(3);
    expect(creatingSourcesBucket.retrieveTypeWithXhrForIndex).toBeCalledWith(3);
});

test('customSources is undefined', () => {
    delete fsLightbox.props.customSources;

    expect(() => {
        createSources(fsLightbox)
    }).not.toThrowError();
});
