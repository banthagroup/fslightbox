import { setUpLightboxOpener } from "./core/main-component/opening/setUpLightboxOpener";
import { getScrollbarWidth } from "./core/scrollbar/getScrollbarWidth";

window.FsLightbox = function () {
    /**
     * @property { Array } sources
     *
     * @property { Array } customClasses
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
     * @property { Number } videosPosters
     */
    this.props = {
        sources: [],
        customClasses: [],
        types: [],
        videosPosters: [],
        maxYoutubeDimensions: null,
        slideDistance: 0.3
    };

    this.data = {
        isInitialized: false,
        maxSourceWidth: 0,
        maxSourceHeight: 0,
        scrollbarWidth: getScrollbarWidth(),
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
        slideSwipingHoverer: null,
        sourcesOutersWrapper: null,
        sources: [],
        sourcesOuters: [],
        sourcesInners: [],
    };

    this.componentsServices = {
        setSlideNumber: () => {},
        enterFullscreen: null,
        exitFullscreen: null
    };

    this.resolve = (dependency, params = []) => {
        params.unshift(this);
        return new dependency(...params);
    };

    this.collections = {
        sourcesOutersTransformers: [],
        sourcesLoadsHandlers: [],
        sourcesRenderFunctions: [],
        // after source load its size adjuster will be stored in this array so it may be later resized
        sourcesStylers: [],
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
        sourceDisplayFacade: {},
        stageManager: {},
        windowResizeActioner: {}
    };

    this.setup = () => {
        setUpLightboxOpener(this);
    };

    this.open = (i) => this.core.lightboxOpener.open(i);

    this.close = () => this.core.lightboxCloser.close();
};
