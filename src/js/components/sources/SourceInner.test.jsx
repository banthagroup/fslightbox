import React from 'react';
import { shallow } from "enzyme";
import SourceInner from "./SourceInner";
import { testComponentStateForStateChainAndFsLightbox } from "../../../tests/__tests-helpers__/testComponentStateForStateChainAndFsLightbox";
import Image from "./proper-sources/Image";

const fsLightbox = {
    componentsStates: { sourcesInnersUpdatersCollection: [] },
    elements: { sourcesInners: [React.createRef()], sourcesComponents: [] }
};

const sourceInner = shallow(<SourceInner fsLightbox={ fsLightbox } i={ 0 }/>);

testComponentStateForStateChainAndFsLightbox('sourcesInnersUpdatersCollection.0', fsLightbox);

test('ref', () => {
    expect(sourceInner.getElement().ref).toBe(fsLightbox.elements.sourcesInners[0]);
});

test('rendering source component', () => {
    expect(sourceInner.children()).toHaveLength(0);
    fsLightbox.elements.sourcesComponents[0] = <Image fsLightbox={ fsLightbox } i={ 0 }/>;
    fsLightbox.componentsStates.sourcesInnersUpdatersCollection[0].set(true);
    expect(sourceInner.childAt(0).getElement()).toEqual(fsLightbox.elements.sourcesComponents[0]);
});
