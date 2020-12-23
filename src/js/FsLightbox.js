import { setUpLightboxOpener } from "./core/main-component/opening/setUpLightboxOpener";
import { getScrollbarWidth } from "./core/scrollbar/getScrollbarWidth";

window.FsLightbox = function () {
    /**
     * @property { Array } sources
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
     * @property { Array } customAttributes
     * @property { Array } customClasses
     * @property { Object } maxYoutubeDimensions
     * @property { Array } videosPosters // deprecated 3.2.0
     *
     * @property { Boolean } exitFullscreenOnClose
     * @property { Boolean } loadOnlyCurrentSource
     * @property { Number } slideDistance
     */
    this.props = {
        sources: [],
        customAttributes: [],
        customClasses: [],
        types: [],
        videosPosters: [], // deprecated 3.2.0
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
        sourceWrappersContainer: null,
        sources: [],
        sourceMainWrappers: [],
        sourceAnimationWrappers: [],
    };

    this.componentsServices = {
        enterFullscreen: null,
        exitFullscreen: null,
        hideSourceLoaderIfNotYetCollection: [],
        // if there is one slide SlideNumber is not rendered so we need to prevent calling undefined function
        setSlideNumber: () => {}
    };

    this.resolve = (dependency, params = []) => {
        params.unshift(this);
        return new dependency(...params);
    };

    this.collections = {
        sourceMainWrappersTransformers: [],
        sourceLoadHandlers: [],
        sourcesRenderFunctions: [],
        // after source load its size adjuster will be stored in this array so it may be later resized
        sourceSizers: [],
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

    setUpLightboxOpener(this);

    this.open = (i) => this.core.lightboxOpener.open(i);

    this.close = () => this.core.lightboxCloser.closeLightbox();
};
