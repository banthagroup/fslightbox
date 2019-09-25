import { CreatingSourcesBucket } from "./CreatingSourcesBucket";
import { AutomaticTypeDetector } from "../types/AutomaticTypeDetector";

let urlToCheck;
const assertUrlToCheckSet = () => {
    if (!urlToCheck) throw new Error('Started automatic type detection without setting url');
};
const fsLightbox = {
    resolve: (constructor) => {
        if (constructor === AutomaticTypeDetector) {
            return automaticTypeDetector;
        } else throw new Error('Invalid dependency');
    },
    props: { sources: ['example-source'] }
};
const localStorageManager = { handleReceivedSourceTypeForUrl: jest.fn() };
const detectedTypeActioner = { runActionsForSourceTypeAndIndex: jest.fn() };
const automaticTypeDetector = {
    setUrlToCheck: jest.fn(() => { urlToCheck = 'example-url'}),
    getSourceType: jest.fn(assertUrlToCheckSet)
};

let creatingSourcesBucket = new CreatingSourcesBucket(fsLightbox, localStorageManager, detectedTypeActioner);

test('getTypeSetByClientForIndex', () => {
    const setUp = () => {
        creatingSourcesBucket = new CreatingSourcesBucket(fsLightbox, localStorageManager, detectedTypeActioner);
        return creatingSourcesBucket.getTypeSetByClientForIndex(0);
    };

    expect(setUp()).toBeUndefined();
    fsLightbox.props.type = 'example-type';
    expect(setUp()).toBe('example-type');
    fsLightbox.props.types = [undefined, 'example-1-type'];
    expect(setUp()).toBe('example-type');
    fsLightbox.props.types[0] = 'example-0-type';
    expect(setUp()).toBe('example-0-type');
});

test('retrieveTypeWithXhrForIndex', () => {
    creatingSourcesBucket.retrieveTypeWithXhrForIndex(0);
    expect(automaticTypeDetector.setUrlToCheck).toBeCalledWith('example-source');
    expect(localStorageManager.handleReceivedSourceTypeForUrl).not.toBeCalled();
    expect(detectedTypeActioner.runActionsForSourceTypeAndIndex).not.toBeCalled();
    automaticTypeDetector.getSourceType.mock.calls[0][0]('test-type');
    expect(localStorageManager.handleReceivedSourceTypeForUrl).toBeCalledWith('test-type', 'example-source');
    expect(detectedTypeActioner.runActionsForSourceTypeAndIndex).toBeCalledWith('test-type', 0);
});
