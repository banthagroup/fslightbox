import { setUpCore } from "./core/setUpCore";

window.FsLightbox = function () {
    /**
     * @property { Array } sources
     *
     * @property { Array } maxDimensions
     * @property { Object } globalMaxDimensions
     *
     * @property { Function } onOpen
     * @property { Function } onClose
     * @property { Function } onInit
     * @property { Function } onShow
     *
     * @property { Boolean } disableLocalStorage
     * @property { Array } types
     * @property { String } type
     *
     * @property { Array } videosPosters
     * @property { Number } slideDistance
     * @property { Boolean } openOnMount
     */
    this.props = {
        sources: [],
        maxWidths: [],
        maxHeights: [],
        types: [],
        videosPosters: []
    };

    this.data = {
        isInitialized: false,
        maxSourceWidth: 0,
        maxSourceHeight: 0,
        scrollbarWidth: 0,
        slideDistance: (this.props.slideDistance) ? this.props.slideDistance : 0.3,
        isFullscreenOpen: false
    };

    this.slideSwipingProps = {
        isSwiping: false,
        downClientX: null,
        isSourceDownEventTarget: false,
        swipedX: 0
    };

    /**
     * @property { Number } previous
     * @property { Number } current
     * @property { Number } next
     */
    this.stageIndexes = {};

    this.elements = {
        // array of <a> tags lightbox was created from
        a: [],
        container: null,
        sourcesOutersWrapper: null,
        sources: [],
        sourcesOuters: [],
        sourcesInners: [],
        sourcesComponents: []
    };

    this.componentsServices = {
        setSlideNumber: null,
        enterFullscreen: null,
        exitFullscreen: null,
    };

    this.resolve = (dependency, params = []) => {
        params.unshift(this);
        return new dependency(...params);
    };

    this.collections = {
        sourcesOutersTransformers: [],
        sourcesLoadsHandlers: [],
        // after source load its size adjuster will be stored in this array so it may be later resized
        sourcesStylers: [],
        // if lightbox is unmounted pending xhrs need to be aborted
        xhrs: []
    };

    this.core = {
        classFacade: {},
        eventsDispatcher: {},
        fullscreenToggler: {},
        globalEventsController: {},
        lightboxCloser: {},
        lightboxOpener: {},
        lightboxUpdater: {},
        scrollbarRecompensor: {},
        slideChangeFacade: {},
        slideIndexChanger: {},
        slideSwipingDown: {},
        sourceLoadActioner: {},
        stageManager: {},
        windowResizeActioner: {}
    };

    setUpCore(this);

    this.open = this.core.lightboxOpener.open;

    this.close = () => {

    };
};
