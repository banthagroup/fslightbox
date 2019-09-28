import { SourceLoadActioner } from "./SourceLoadActioner";

export function SourceLoadHandler({ props, resolve, }, i) {
    this.handleImageLoad = ({ target: { width, height } }) => {
        this.handleImageLoad = loadInitiallyAndGetNormalLoad(width, height);
    };

    this.handleVideoLoad = ({ target: { videoWidth, videoHeight } }) => {
        this.handleVideoLoad = loadInitiallyAndGetNormalLoad(videoWidth, videoHeight);
    };

    this.handleMaxDimensionsSourceLoad = () => {
        let width = 1920;
        let height = 1080;

        if (props.maxDimensions && props.maxDimensions[i]) {
            width = props.maxDimensions[i].width;
            height = props.maxDimensions[i].height;
        } else if (props.globalMaxDimensions) {
            width = props.globalMaxDimensions.width;
            height = props.globalMaxDimensions.height;
        }

        this.handleMaxDimensionsSourceLoad = loadInitiallyAndGetNormalLoad(width, height);
    };

    const loadInitiallyAndGetNormalLoad = (defaultWidth, defaultHeight) => {
        const sourceLoadActioner = resolve(SourceLoadActioner, [i, defaultWidth, defaultHeight]);
        sourceLoadActioner.runInitialLoadActions();

        return sourceLoadActioner.runNormalLoadActions;
    };
}
