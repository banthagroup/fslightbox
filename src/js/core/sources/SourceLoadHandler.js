import { SourceLoadActioner } from "./SourceLoadActioner";

export function SourceLoadHandler({ elements: { sources }, props, resolve, }, i) {
    let wasVideoLoadCalled;

    this.handleImageLoad = ({ target: { width, height } }) => {
        this.handleImageLoad = loadInitiallyAndGetNormalLoad(width, height);
    };

    this.handleVideoLoad = ({ target: { videoWidth, videoHeight } }) => {
        wasVideoLoadCalled = true;
        this.handleVideoLoad = loadInitiallyAndGetNormalLoad(videoWidth, videoHeight);
    };

    this.handleNotMetaDatedVideoLoad = () => {
        if (!wasVideoLoadCalled) {
            this.handleYoutubeLoad();
        }
    };

    this.handleYoutubeLoad = () => {
        let width = 1920;
        let height = 1080;

        if (props.maxYoutubeDimensions) {
            width = props.maxYoutubeDimensions.width;
            height = props.maxYoutubeDimensions.height;
        }

        this.handleYoutubeLoad = loadInitiallyAndGetNormalLoad(width, height);
    };

    this.handleCustomLoad = () => {
        setTimeout(() => {
            this.handleCustomLoad = loadInitiallyAndGetNormalLoad(sources[i].offsetWidth, sources[i].offsetHeight);
        });
    };

    const loadInitiallyAndGetNormalLoad = (defaultWidth, defaultHeight) => {
        const sourceLoadActioner = resolve(SourceLoadActioner, [i, defaultWidth, defaultHeight]);

        sourceLoadActioner.runInitialLoadActions();

        return sourceLoadActioner.runNormalLoadActions;
    };
}
