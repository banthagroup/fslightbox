import { FLEX_CENTERED_CLASS_NAME, PREFIX } from "../../constants/classes-names";

export function renderSlideNumber({ componentsServices, props: { sources }, stageIndexes }, parent) {
    const slideNumber = document.createElement('div');
    slideNumber.className = `${ PREFIX }slide-number-container ${ FLEX_CENTERED_CLASS_NAME }`;

    const currentNumber = document.createElement('div');
    componentsServices.setSlideNumber = (number) => currentNumber.innerHTML = number;

    const slash = document.createElement('div');
    slash.className = `${ PREFIX }slash`;
    slash.innerHTML = '/';

    const totalNumber = document.createElement('div');
    totalNumber.innerHTML = sources.length;

    slideNumber.appendChild(currentNumber);
    slideNumber.appendChild(slash);
    slideNumber.appendChild(totalNumber);
    parent.appendChild(slideNumber);
}
