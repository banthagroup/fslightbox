import '../../../src/index.js'
import '../../../src/scss/index.scss'
import Base from "./components/Base";
import BaseOpened from "./components/BaseOpened";

const renderTestComponentFunctions = [
    Base,
    BaseOpened
];

for (let i = 0; i < renderTestComponentFunctions.length; i++) {
    const btn = document.createElement('button');
    btn.id = renderTestComponentFunctions[i].name;
    btn.addEventListener('click', renderTestComponentFunctions[i]);
    document.body.appendChild(btn);
}