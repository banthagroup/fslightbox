import { LightboxCloseActioner } from "./LightboxCloseActioner";

export function setUpLightboxCloser({ core: { lightboxCloser: self }, resolve }) {
    const lightboxCloseActioner = resolve(LightboxCloseActioner);

    self.close = () => {
        if (!lightboxCloseActioner.isLightboxFadingOut) {
            lightboxCloseActioner.runActions();
        }
    };
}
