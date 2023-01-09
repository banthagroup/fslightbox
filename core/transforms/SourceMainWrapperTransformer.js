export function SourceMainWrapperTransformer({ elements: { sourceMainWrappers }, props }, i) {
    let additionalTransformValue = 0;

    this.byValue = (value) => {
        additionalTransformValue = value;
        return this;
    };

    this.negative = () => {
        setFinalTransformAndCleanTransformer(-getDefaultTransformDistance());
    };

    this.zero = () => {
        setFinalTransformAndCleanTransformer(0);
    };

    this.positive = () => {
        setFinalTransformAndCleanTransformer(getDefaultTransformDistance());
    };

    const setFinalTransformAndCleanTransformer = (value) => {
        sourceMainWrappers[i].style.transform = `translateX(${value + additionalTransformValue}px)`;
        additionalTransformValue = 0;
    };

    const getDefaultTransformDistance = () => (1 + props.slideDistance) * innerWidth;
}
