import './c/styles/styles-injection/styles-injection';
import { so } from "./c/so";

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
     * @property { Boolean } autoplay
     * @property { Array } autoplays
     * @property { Object } maxYoutubeDimensions
     * @property { Array } videosPosters // deprecated 3.2.0
     *
     * @property { Boolean } exitFullscreenOnClose
     * @property { Boolean } loadOnlyCurrentSource
     * @property { Number } sourceMargin
     * @property { Number } slideDistance
     */
    this.props = {
        sources: [],
        customAttributes: [],
        customClasses: [],
        autoplays: [],
        types: [],
        videosPosters: [], // deprecated 3.2.0
	exitFullscreenOnClose: 1,
	sourceMargin: 0.05,
        slideDistance: 0.3
    };

    this.data = {
        isFullscreenOpen: false,
        scrollbarWidth: 0
    };this.isl=[];

    this.sourcePointerProps = {
        downScreenX: null,
        isPointering: false,
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
	smw: [],
        sourceWrappersContainer: null,
        sources: [],
        sourceAnimationWrappers: [],
    };

	// Prevents calling undefined function if there is only one slide.
    this.sn=()=>{};

    this.resolve = (dependency, params = []) => {
        params.unshift(this);
        return new dependency(...params);
    };

    this.collections = {
        sourceLoadHandlers: [],
        sourcesRenderFunctions: [],
        // after source load its size adjuster will be stored in this array so it may be later resized
        sourceSizers: [],
    };

    this.core = {
        globalEventsController: {},
        lightboxCloser: {},
        lightboxUpdater: {},
        scrollbarRecompensor: {},
        slideChangeFacade: {},
        slideIndexChanger: {},
        sourcesPointerDown: {},
        sourceDisplayFacade: {},
        stageManager: {},
        windowResizeActioner: {}
    };this.ap={};this.fs={};this.sws={};

    this.e = (n) => {	
        if (this.props[n])
            this.props[n](this)
    };

    so(this);

    this.close = () => this.core.lightboxCloser.closeLightbox();
};
