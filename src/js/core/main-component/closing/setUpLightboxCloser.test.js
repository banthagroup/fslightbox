import { setUpLightboxCloser } from "./setUpLightboxCloser";
import { LightboxCloseActioner } from "./LightboxCloseActioner";

const fsLightbox = {
    resolve: (dependency) => {
        if (dependency === LightboxCloseActioner) {
            return lightboxCloseActioner;
        } else throw new Error('Invalid dependency')
    },
    core: { lightboxCloser: {} }
};
const lightboxCloser = fsLightbox.core.lightboxCloser;
const lightboxCloseActioner = { runActions: jest.fn(), isLightboxFadingOut: true };
setUpLightboxCloser(fsLightbox);

test('close', () => {
    lightboxCloser.closeLightbox();
    expect(lightboxCloseActioner.runActions).not.toBeCalled();

    lightboxCloseActioner.isLightboxFadingOut = false;
    lightboxCloser.closeLightbox();
    expect(lightboxCloseActioner.runActions).toBeCalled();
}); 
