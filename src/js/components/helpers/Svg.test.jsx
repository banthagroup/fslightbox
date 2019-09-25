import React from "react";
import { shallow } from "enzyme/build";
import Svg from "./Svg";

test('Svg DOM', () => {
    expect(shallow(<Svg
        viewBox={ '0 0 20 20' }
        size={ '26px' }
        d={ 'M142' }
    />)).toMatchSnapshot();
});
