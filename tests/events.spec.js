import { renderLightbox } from "./__tests-services__/renderLightbox";

jest.useFakeTimers();

test('events', () => {
    renderLightbox();
    fsLightbox.props.onOpen = jest.fn();
    fsLightbox.props.onInit = jest.fn();
    fsLightbox.props.onShow = jest.fn();
    fsLightbox.props.onClose = jest.fn();

    document.getElementsByTagName('a')[0].dispatchEvent(new Event('click'));
    expect(fsLightbox.props.onOpen).toBeCalled();
    expect(fsLightbox.props.onInit).toBeCalled();
    expect(fsLightbox.props.onShow).not.toBeCalled();

    document.getElementsByClassName('fslightbox-toolbar-button')[1].dispatchEvent(new Event('click'));
    jest.runTimersToTime(220);
    expect(fsLightbox.props.onClose).toBeCalled();

    document.getElementsByTagName('a')[1].dispatchEvent(new Event('click'));
    expect(fsLightbox.props.onInit).toBeCalledTimes(1);
    expect(fsLightbox.props.onOpen).toBeCalledTimes(2);
    expect(fsLightbox.props.onShow).toBeCalled();
});
