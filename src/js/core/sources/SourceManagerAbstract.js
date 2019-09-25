export function SourceManagerAbstract() {
    this.setIndex = (index) => {
        this.i = index;
    };

    this.setDefaultDimensions = (width, height) => {
        this.defaultWidth = width;
        this.defaultHeight = height;
    };
}
