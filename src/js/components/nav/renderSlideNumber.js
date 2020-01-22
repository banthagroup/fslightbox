import { FLEX_CENTERED_CLASS_NAME, PREFIX } from "../../constants/classes-names";

export function renderSlideNumber({ componentsServices, props: { sources }, stageIndexes }, parent) {
    const slideNumberOuter = document.createElement('div');
    slideNumberOuter.className = `${PREFIX}slide-number-container`;

    const slideNumberInner = document.createElement('div');
    slideNumberInner.className = FLEX_CENTERED_CLASS_NAME;

    const currentNumber = document.createElement('span');
    componentsServices.setSlideNumber = (number) => currentNumber.innerHTML = number;

    const slash = document.createElement('span');
    slash.className = `${PREFIX}slash`;

    const totalNumber = document.createElement('div');
    totalNumber.innerHTML = sources.length;

    slideNumberOuter.appendChild(slideNumberInner);
    slideNumberInner.appendChild(currentNumber);
    slideNumberInner.appendChild(slash);
    slideNumberInner.appendChild(totalNumber);
    parent.appendChild(slideNumberOuter);

    setTimeout(() => {
        if (slideNumberInner.offsetWidth > 55) {
            slideNumberOuter.style.justifyContent = 'flex-start';
        }
    });
}
