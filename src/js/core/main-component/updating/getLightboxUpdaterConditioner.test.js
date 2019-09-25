import { getLightboxUpdaterConditioner } from "./getLightboxUpdaterConditioner";

const lightboxUpdaterBucket = getLightboxUpdaterConditioner();

describe('hasTogglerPropChanged', () => {
    it('should return false due to prop has not changed', () => {
        lightboxUpdaterBucket.setPrevProps({
            toggler: false
        });
        lightboxUpdaterBucket.setCurrProps({
            toggler: false
        });
        expect(lightboxUpdaterBucket.hasTogglerPropChanged()).toBe(false);

        lightboxUpdaterBucket.setPrevProps({
            toggler: true
        });
        lightboxUpdaterBucket.setCurrProps({
            toggler: true
        });
        expect(lightboxUpdaterBucket.hasTogglerPropChanged()).toBe(false);
    });

    it('should return true due to prop has changed', () => {
        lightboxUpdaterBucket.setPrevProps({
            toggler: true
        });
        lightboxUpdaterBucket.setCurrProps({
            toggler: false
        });
        expect(lightboxUpdaterBucket.hasTogglerPropChanged()).toBe(true);

        lightboxUpdaterBucket.setPrevProps({
            toggler: false
        });
        lightboxUpdaterBucket.setCurrProps({
            toggler: true
        });
        expect(lightboxUpdaterBucket.hasTogglerPropChanged()).toBe(true);
    });
});

describe('hasSlidePropChanged', () => {
    it(`should return false due to current slide prop is undefined, even
      if previous slide prop is defined`, () => {
        lightboxUpdaterBucket.setPrevProps({
            slide: 1
        });
        lightboxUpdaterBucket.setCurrProps({
            slide: undefined
        });
        expect(lightboxUpdaterBucket.hasSlidePropChanged()).toBe(false);
    });

    it(`should return false due to current slide prop is same as previous`, () => {
        lightboxUpdaterBucket.setPrevProps({
            slide: 2
        });
        lightboxUpdaterBucket.setCurrProps({
            slide: 2
        });
        expect(lightboxUpdaterBucket.hasSlidePropChanged()).toBe(false);
    });

    it('should return true due to index has changed', () => {
        lightboxUpdaterBucket.setPrevProps({
            slide: 2,
        });
        lightboxUpdaterBucket.setCurrProps({
            slide: 4
        });
        expect(lightboxUpdaterBucket.hasSlidePropChanged()).toBe(true);
    });
});

describe('hasSourcePropChanged', () => {
    it(`should return false due to current source prop is undefined, even
      if previous source prop is defined`, () => {
        lightboxUpdaterBucket.setPrevProps({
            source: 'test-source'
        });
        lightboxUpdaterBucket.setCurrProps({
            source: undefined
        });
        expect(lightboxUpdaterBucket.hasSourcePropChanged()).toBe(false);
    });

    it(`should return false due to current source prop is same as previous`, () => {
        lightboxUpdaterBucket.setPrevProps({
            source: 'previous-source'
        });
        lightboxUpdaterBucket.setCurrProps({
            source: 'previous-source'
        });
        expect(lightboxUpdaterBucket.hasSourcePropChanged()).toBe(false);
    });

    it('should return true due to index has changed', () => {
        lightboxUpdaterBucket.setPrevProps({
            source: 'previous-source',
        });
        lightboxUpdaterBucket.setCurrProps({
            source: ''
        });
        expect(lightboxUpdaterBucket.hasSourcePropChanged()).toBe(true);
    });
});

describe('hasSourceIndexPropChanged', () => {
    it(`should return false due to current sourceIndex prop is undefined, even
      if previous sourceIndex prop is defined`, () => {
        lightboxUpdaterBucket.setPrevProps({
            sourceIndex: 1
        });
        lightboxUpdaterBucket.setCurrProps({
            sourceIndex: undefined
        });
        expect(lightboxUpdaterBucket.hasSourceIndexPropChanged()).toBe(false);
    });

    it(`should return false due to current sourceIndex prop is same as previous`, () => {
        lightboxUpdaterBucket.setPrevProps({
            sourceIndex: 3
        });
        lightboxUpdaterBucket.setCurrProps({
            sourceIndex: 3
        });
        expect(lightboxUpdaterBucket.hasSourceIndexPropChanged()).toBe(false);
    });

    it('should return true due to source index has changed', () => {
        lightboxUpdaterBucket.setPrevProps({
            sourceIndex: 2,
        });
        lightboxUpdaterBucket.setCurrProps({
            sourceIndex: 0
        });
        expect(lightboxUpdaterBucket.hasSourceIndexPropChanged()).toBe(true);
    });
});
