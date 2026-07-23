import { LightboxCloseActioner } from "./LightboxCloseActioner";

export function setUpLightboxCloser(o) {
	var { core: { lightboxCloser: self }, resolve } = o,
	lightboxCloseActioner = resolve(LightboxCloseActioner);

    self.close = () => {
        if (o.io && !lightboxCloseActioner.isLightboxFadingOut) {
            lightboxCloseActioner.runActions();
        }
    };
}
