import { SourceOuterTransformer } from "../transforms/SourceOuterTransformer";
import { fillSourcesOutersTransformersCollection } from "./fillSourcesOutersTransformersCollection";

const fsLightbox = {
    collections: { sourceMainWrappersTransformers: [] },
    resolve: (constructorDependency) => {
        if (constructorDependency === SourceOuterTransformer) {
            return 'source-outer-transformer';
        }
    },
    props: { sources: { length: 2 } }
};

it('should return array containing SourceOuterTransformer instances', () => {
    fillSourcesOutersTransformersCollection(fsLightbox);

    expect(fsLightbox.collections.sourceMainWrappersTransformers).toEqual(
        ['source-outer-transformer', 'source-outer-transformer']
    );
});
