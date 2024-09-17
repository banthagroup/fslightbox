export function SourceSizer(o, i, defaultWidth, defaultHeight) {
	var { data, elements: { sources } } = o, r = defaultWidth / defaultHeight, h = 0;

    /**
     * This method takes care of setting sources dimensions.
     * Unfortunately wa cannot only set max width and max height and allow the sources to scale themselves,
     * due tu Youtube source which dimensions needs to be set in advance.
     * In this case we are calculating dimensions mathematically.
     */
    this.adjustSize = () => {
        h = o.mw / r;

        // wider than higher
        if (h < o.mh) {
            if (defaultWidth < o.mw) {
                h = defaultHeight;
            }
            return updateDimensions();
        }

        // higher than wider
        if (defaultHeight > o.mh) {
            h = o.mh;
        } else {
            h = defaultHeight;
        }

        updateDimensions();
    };

    const updateDimensions = () => {
        sources[i].style.width = h * r + 'px';
        sources[i].style.height = h + 'px';
    }
}
