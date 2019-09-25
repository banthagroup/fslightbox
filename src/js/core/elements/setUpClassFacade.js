import { removeFromElementClassIfContains } from "../../helpers/elements/removeFromElementClassIfContains";

export function setUpClassFacade({ core: { classFacade: self }, elements }) {
    self.removeFromEachElementClassIfContains = (elementsArrayName, className) => {
        for (let i = 0; i < elements[elementsArrayName].length; i++) {
            removeFromElementClassIfContains(elements[elementsArrayName][i], className);
        }
    }
}
