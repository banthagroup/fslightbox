import { SourceLoadActioner } from "./SourceLoadActioner";

export function SourceLoadHandler({ elements: { sources }, props, resolve, }, i) {
    const sourceLoadActioner = resolve(SourceLoadActioner, [i]);

    let wasVideoLoadCalled;

    this.handleImageLoad = ({ target: { naturalWidth, naturalHeight } }) => {
        sourceLoadActioner.runActions(naturalWidth, naturalHeight)
    };

    this.handleVideoLoad = ({ target: { videoWidth, videoHeight } }) => {
        wasVideoLoadCalled = true;
        sourceLoadActioner.runActions(videoWidth, videoHeight)
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

        sourceLoadActioner.runActions(width, height);
    };

    this.handleCustomLoad = () => {
        setTimeout(() => {
            const source = sources[i];
            sourceLoadActioner.runActions(source.offsetWidth, source.offsetHeight);
        });
    };
}
