import { setUpStageManager } from "./setUpStageManager";

const fsLightbox = {
    stageIndexes: {
        previous: undefined,
        current: undefined,
        next: undefined
    },
    core: { stageManager: {} },
    props: { sources: { length: 10 } }
};
const stageManager = fsLightbox.core.stageManager;

const setUpStageManagerAndCallUpdateStageIndexes = () => {
    setUpStageManager(fsLightbox);
    stageManager.updateStageIndexes();
};

describe('isSourceInStage', () => {
    beforeAll(() => {
        fsLightbox.props.sources.length = 10;
        setUpStageManager(fsLightbox);
    });

    it('should detect that sources in stage when its middle slide', () => {
        fsLightbox.stageIndexes.current = 4;
        expect(stageManager.isSourceInStage(0)).toBeFalsy();
        expect(stageManager.isSourceInStage(1)).toBeFalsy();
        expect(stageManager.isSourceInStage(2)).toBeFalsy();
        expect(stageManager.isSourceInStage(3)).toBeTruthy();
        expect(stageManager.isSourceInStage(4)).toBeTruthy();
        expect(stageManager.isSourceInStage(5)).toBeTruthy();
        expect(stageManager.isSourceInStage(6)).toBeFalsy();
        expect(stageManager.isSourceInStage(7)).toBeFalsy();
        expect(stageManager.isSourceInStage(8)).toBeFalsy();
        expect(stageManager.isSourceInStage(9)).toBeFalsy();
    });

    it('should detect that previous sources is in stage when slide = 1', () => {
        fsLightbox.stageIndexes.current = 0;
        expect(stageManager.isSourceInStage(9)).toBeTruthy();
    });

    it('should detect that next sources is in stage when slide = lastSourceIndex', () => {
        fsLightbox.stageIndexes.current = 9;
        expect(stageManager.isSourceInStage(0)).toBeTruthy();
    });

    test('there are only 3 slides', () => {
        fsLightbox.props.sources.length = 3;
        setUpStageManager(fsLightbox);

        expect(stageManager.isSourceInStage(0)).toBe(true);
        expect(stageManager.isSourceInStage(1)).toBe(true);
        expect(stageManager.isSourceInStage(2)).toBe(true);
    });
});

describe('updateStageIndexes', () => {
    test('there is only one slide', () => {
        fsLightbox.props.sources.length = 1;
        setUpStageManagerAndCallUpdateStageIndexes();

        expect(fsLightbox.stageIndexes.previous).toBeUndefined();
        expect(fsLightbox.stageIndexes.next).toBeUndefined();
    });

    describe('there are two slides', () => {
        beforeAll(() => {
            fsLightbox.props.sources.length = 2;
        });

        test('current slide = 1', () => {
            fsLightbox.stageIndexes.current = 0;
            setUpStageManagerAndCallUpdateStageIndexes();

            expect(fsLightbox.stageIndexes.previous).toBeUndefined();
            expect(fsLightbox.stageIndexes.next).toBe(1);
        });

        test('current slide = 2', () => {
            fsLightbox.stageIndexes.current = 1;
            setUpStageManagerAndCallUpdateStageIndexes();

            expect(fsLightbox.stageIndexes.previous).toBe(0);
            expect(fsLightbox.stageIndexes.next).toBeUndefined();
        });
    });

    describe('there are 3 slides', () => {
        beforeAll(() => {
            fsLightbox.props.sources.length = 3;
        });

        test('current slide = 1', () => {
            fsLightbox.stageIndexes.current = 0;
            setUpStageManagerAndCallUpdateStageIndexes();

            expect(fsLightbox.stageIndexes).toEqual({
                previous: 2,
                current: 0,
                next: 1
            });
        });

        test('current slide = 2', () => {
            fsLightbox.stageIndexes.current = 1;
            setUpStageManagerAndCallUpdateStageIndexes();

            expect(fsLightbox.stageIndexes).toEqual({
                previous: 0,
                current: 1,
                next: 2
            });
        });

        test('current slide = 3', () => {
            fsLightbox.stageIndexes.current = 2;
            setUpStageManagerAndCallUpdateStageIndexes();

            expect(fsLightbox.stageIndexes).toEqual({
                previous: 1,
                current: 2,
                next: 0
            });
        });
    });
});
