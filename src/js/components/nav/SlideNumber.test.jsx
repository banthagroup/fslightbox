import React from 'react';
import { shallow } from "enzyme";
import SlideNumber from "./SlideNumber";
import { testComponentStateForStateChainAndFsLightbox } from "../../../tests/__tests-helpers__/testComponentStateForStateChainAndFsLightbox";

const fsLightbox = {
    componentsStates: {
        slideNumberUpdater: {}
    },
    data: {
        sourcesCount: 4
    },
    stageIndexes: {
        current: 0
    }

};
let slideNumber = shallow(<SlideNumber fsLightbox={ fsLightbox }/>);

testComponentStateForStateChainAndFsLightbox('slideNumberUpdater', fsLightbox);

test('SlideNumber dom', () => {
    expect(slideNumber).toMatchSnapshot();
});
