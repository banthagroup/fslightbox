import { setUpSlideChangeFacade } from "./setUpSlideChangeFacade";

const fsLightbox = {
    core: {
        slideIndexChanger: {},
        slideChangeFacade: {},
        stageManager: { getPreviousSlideIndex: () => 25, getNextSlideIndex: () => 50 }
    },
    props: { sources: { length: 1 } }
};

const slideIndexChanger = fsLightbox.core.slideIndexChanger;
const slideChangeFacade = fsLightbox.core.slideChangeFacade;

beforeEach(() => {
    slideIndexChanger.jumpTo = jest.fn();
});

test('changeToPrevious', () => {
    setUpSlideChangeFacade(fsLightbox);
    slideChangeFacade.changeToPrevious();
    expect(slideIndexChanger.jumpTo).not.toBeCalled();

    fsLightbox.props.sources.length = 2;
    setUpSlideChangeFacade(fsLightbox);
    slideChangeFacade.changeToPrevious();
    expect(slideIndexChanger.jumpTo).toBeCalledWith(25);
});

test('changeToNext', () => {
    fsLightbox.props.sources.length = 1;
    setUpSlideChangeFacade(fsLightbox);
    slideChangeFacade.changeToNext();
    expect(slideIndexChanger.jumpTo).not.toBeCalled();

    fsLightbox.props.sources.length = 2;
    setUpSlideChangeFacade(fsLightbox);
    slideChangeFacade.changeToNext();
    expect(slideIndexChanger.jumpTo).toBeCalledWith(50);
});
