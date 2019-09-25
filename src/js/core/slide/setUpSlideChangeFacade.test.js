import { setUpSlideChangeFacade } from "./setUpSlideChangeFacade";

const fsLightbox = {
    core: {
        slideIndexChanger: {
            jumpTo: () => {}
        },
        slideChangeFacade: {},
        stageManager: {
            getPreviousSlideIndex: () => {},
            getNextSlideIndex: () => {}
        }
    },
    data: {
        sourcesCount: undefined
    }
};

const slideIndexChanger = fsLightbox.core.slideIndexChanger;
const stageManager = fsLightbox.core.stageManager;

const slideChangeFacade = fsLightbox.core.slideChangeFacade;

beforeEach(() => {
    stageManager.getPreviousSlideIndex = () => 25;
    stageManager.getNextSlideIndex = () => 50;
    slideIndexChanger.jumpTo = jest.fn();
});

describe('changeToPrevious', () => {
    it('should not call jumpTo due to there is only one slide', () => {
        fsLightbox.data.sourcesCount = 1;
        setUpSlideChangeFacade(fsLightbox);
        slideChangeFacade.changeToPrevious();
        expect(slideIndexChanger.jumpTo).not.toBeCalled();
    });

    it(`should call jumpTo with  previous slide index 
        due to sourcesCount > 1`, () => {
        fsLightbox.data.sourcesCount = 2;
        setUpSlideChangeFacade(fsLightbox);
        slideChangeFacade.changeToPrevious();
        expect(slideIndexChanger.jumpTo).toBeCalledWith(25);
    });
});

describe('changeToNext', () => {
    it('should not call jumpTo due to there is only one slide', () => {
        fsLightbox.data.sourcesCount = 1;
        setUpSlideChangeFacade(fsLightbox);
        slideChangeFacade.changeToNext();
        expect(slideIndexChanger.jumpTo).not.toBeCalled();
    });

    it(`should call jumpTo with next slide index 
        due to sourcesCount > 1`, () => {
        fsLightbox.data.sourcesCount = 2;
        setUpSlideChangeFacade(fsLightbox);
        slideChangeFacade.changeToNext();
        expect(slideIndexChanger.jumpTo).toBeCalledWith(50);
    });
});
