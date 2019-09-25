import { setUpClassFacade } from "./setUpClassFacade";
import * as removeFromElementClassIfContainsObject from "../../helpers/elements/removeFromElementClassIfContains";

const fsLightbox = {
    core: { classFacade: {} },
    elements: { sources: ['first-source', 'second-source'] }
};
const classFacade = fsLightbox.core.classFacade;
setUpClassFacade(fsLightbox);

removeFromElementClassIfContainsObject.removeFromElementClassIfContains = jest.fn();

test('removeFromEachElementClassIfContains', () => {
    classFacade.removeFromEachElementClassIfContains('sources', 'class-name');
    expect(removeFromElementClassIfContainsObject.removeFromElementClassIfContains)
        .toBeCalledWith('first-source', 'class-name');
    expect(removeFromElementClassIfContainsObject.removeFromElementClassIfContains)
        .toBeCalledWith('second-source', 'class-name');
});
