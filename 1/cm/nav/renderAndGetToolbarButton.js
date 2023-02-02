import { FLEX_CENTERED_CLASS_NAME, PREFIX } from "../../cn/classes-names";

export function renderAndGetToolbarButton(parent, title) {
    const toolbarButton = document.createElement('div');
    toolbarButton.className = `${PREFIX}toolbar-button ${FLEX_CENTERED_CLASS_NAME}`;
    toolbarButton.title = title;

    parent.appendChild(toolbarButton);

    return toolbarButton;
}
