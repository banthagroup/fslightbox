import { LightboxUpdateActioner } from "./LightboxUpdateActioner";
import { getLightboxUpdaterConditioner } from "./getLightboxUpdaterConditioner";

export function setUpLightboxUpdater({ core: { lightboxUpdater: self, }, data: { sources }, getProps, resolve }) {
    const updatingActioner = resolve(LightboxUpdateActioner);
    const lightboxUpdaterConditioner = getLightboxUpdaterConditioner();

    self.handleUpdate = (previousProps) => {
        const currentProps = getProps();
        lightboxUpdaterConditioner.setPrevProps(previousProps);
        lightboxUpdaterConditioner.setCurrProps(currentProps);

        if (lightboxUpdaterConditioner.hasTogglerPropChanged()) {
            updatingActioner.runTogglerUpdateActions();
        }

        if (lightboxUpdaterConditioner.hasSourcePropChanged()) {
            updatingActioner.runCurrentStageIndexUpdateActionsFor(sources.indexOf(currentProps.source));
        } else if (lightboxUpdaterConditioner.hasSourceIndexPropChanged()) {
            updatingActioner.runCurrentStageIndexUpdateActionsFor(currentProps.sourceIndex);
        } else if (lightboxUpdaterConditioner.hasSlidePropChanged()) {
            updatingActioner.runCurrentStageIndexUpdateActionsFor(currentProps.slide - 1);
        }
    };
}
