export function getOuterElementOfWidthGetter() {
    const outer = document.createElement('div');
    const outerStyle = outer.style;
    outerStyle.visibility = "hidden";
    outerStyle.width = "100px";
    outerStyle.msOverflowStyle = "scrollbar";
    outerStyle.overflow = "scroll";
    return outer;
}
