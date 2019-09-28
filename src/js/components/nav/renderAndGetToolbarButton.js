import { FLEX_CENTERED_CLASS_NAME, PREFIX } from "../../constants/classes-names";

export function renderAndGetToolbarButton(parent) {
    const toolbarButton = document.createElement('div');
    toolbarButton.className = `${ PREFIX }toolbar-button ${ FLEX_CENTERED_CLASS_NAME }`;

    parent.appendChild(toolbarButton);

    return toolbarButton;
}
