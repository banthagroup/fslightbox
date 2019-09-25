import { SourceLoadActioner } from "./SourceLoadActioner";

export function SourceLoadHandler(
    {
        props: { maxYoutubeVideoDimensions, customSourcesMaxDimensions, customSourcesGlobalMaxDimensions },
        resolve,
    }, i
) {
    let defaultWidth;
    let defaultHeight;
    let setUpSourceDimensions = () => {};

    this.setUpLoadForImage = () => {
        setUpSourceDimensions = ({ target: { width, height } }) => {
            defaultWidth = width;
            defaultHeight = height;
        }
    };

    this.setUpLoadForVideo = () => {
        setUpSourceDimensions = ({ target: { videoWidth, videoHeight } }) => {
            defaultWidth = videoWidth;
            defaultHeight = videoHeight;
        }
    };

    this.setUpLoadForYoutube = () => {
        if (maxYoutubeVideoDimensions && maxYoutubeVideoDimensions[i]) {
            defaultWidth = maxYoutubeVideoDimensions[i].width;
            defaultHeight = maxYoutubeVideoDimensions[i].height;
        } else {
            defaultWidth = 1920;
            defaultHeight = 1080;
        }
    };

    this.setUpLoadForCustom = () => {
        if (customSourcesMaxDimensions && customSourcesMaxDimensions[i]) {
            defaultWidth = customSourcesMaxDimensions[i].width;
            defaultHeight = customSourcesMaxDimensions[i].height;
        } else if (customSourcesGlobalMaxDimensions) {
            defaultWidth = customSourcesGlobalMaxDimensions.width;
            defaultHeight = customSourcesGlobalMaxDimensions.height;
        } else {
            throw new Error('You need to set max dimensions of custom sources. Use customSourcesMaxDimensions prop array or customSourcesGlobalMaxDimensions prop object');
        }
    };

    this.handleLoad = (e) => {
        setUpSourceDimensions(e);

        const sourceLoadActioner = resolve(SourceLoadActioner, [i, defaultWidth, defaultHeight]);
        sourceLoadActioner.runInitialLoadActions();

        this.handleLoad = sourceLoadActioner.runNormalLoadActions;
    };
}
