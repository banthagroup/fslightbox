import React from 'react';
import { shallow } from "enzyme";
import SourceOuter from "./SourceOuter";
import { testComponentStateForStateChainAndFsLightbox } from "../../../tests/__tests-helpers__/testComponentStateForStateChainAndFsLightbox";
import Loader from "../helpers/Loader";
import SourceInner from "./SourceInner";

const fsLightbox = {
    componentsStates: { isSourceLoadedCollection: [] },
    elements: { sourcesOuters: [React.createRef()] }
};
const sourceInner = shallow(<SourceOuter fsLightbox={ fsLightbox } i={ 0 }/>);

testComponentStateForStateChainAndFsLightbox('isSourceLoadedCollection.0', fsLightbox);

test('ref', () => {
    expect(sourceInner.getElement().ref).toBe(fsLightbox.elements.sourcesOuters[0]);
});

test('displaying Loader', () => {
    expect(sourceInner.children().getElements()).toEqual(
        [<Loader/>, <SourceInner fsLightbox={ fsLightbox } i={ 0 }/>]
    );
    fsLightbox.componentsStates.isSourceLoadedCollection[0].set(true);
    expect(sourceInner.children().getElements()).toEqual(
        [<SourceInner fsLightbox={ fsLightbox } i={ 0 }/>]
    );
});
