import { SourceLoadActioner } from "./SourceLoadActioner";

export function SourceLoadHandler({ elements: { sources }, props, resolve, }, i) {
    const sourceLoadActioner = resolve(SourceLoadActioner, [i]);

    let wasVideoLoadCalled;

    this.handleImageLoad = ({ target: { naturalWidth, naturalHeight } }) => {
        sourceLoadActioner.b(naturalWidth, naturalHeight);
    };

    this.handleVideoLoad = ({ target: { videoWidth, videoHeight } }) => {
        wasVideoLoadCalled = true;
        sourceLoadActioner.b(videoWidth, videoHeight);
    };

    this.handleNotMetaDatedVideoLoad = () => {
        if (!wasVideoLoadCalled) {
            this.handleYoutubeLoad();
        }
    };

    this.handleYoutubeLoad = (w, h) => {
	if(!w){w=1920;h=1080}
        if (props.maxYoutubeDimensions) {
            w = props.maxYoutubeDimensions.width;
            h = props.maxYoutubeDimensions.height;
        }

        sourceLoadActioner.b(w, h);
    };

    this.handleCustomLoad = () => {
	var s = sources[i],w=s.offsetWidth,h=s.offsetHeight;
	
	if (!w || !h) {
		setTimeout(this.handleCustomLoad);
		return;
	}

        sourceLoadActioner.b(w,h);
    };
}
