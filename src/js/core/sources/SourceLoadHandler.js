import { SourceLoadActioner } from "./SourceLoadActioner";

export function SourceLoadHandler({ elements: { sources }, props, resolve, }, i) {
    let wasVideoLoadCalled;

    this.handleImageLoad = ({ target: { width, height } }) => {
        loadSourceWithDimensions(width, height);
    };

    this.handleVideoLoad = ({ target: { videoWidth, videoHeight } }) => {
        wasVideoLoadCalled = true;
        loadSourceWithDimensions(videoWidth, videoHeight);
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

        loadSourceWithDimensions(width, height);
    };

    this.handleCustomLoad = () => {
        setTimeout(() => {
            loadSourceWithDimensions(sources[i].offsetWidth, sources[i].offsetHeight);
        });
    };

    const loadSourceWithDimensions = (defaultWidth, defaultHeight) => {
        const sourceLoadActioner = resolve(SourceLoadActioner, [i, defaultWidth, defaultHeight]);
        sourceLoadActioner.runActions();
    };
}
