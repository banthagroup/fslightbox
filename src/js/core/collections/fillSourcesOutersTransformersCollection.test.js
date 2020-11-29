import { SourceMainWrapperTransformer } from "../transforms/SourceMainWrapperTransformer";
import { fillSourcesOutersTransformersCollection } from "./fillSourcesOutersTransformersCollection";

const fsLightbox = {
    collections: { sourceMainWrappersTransformers: [] },
    resolve: (constructorDependency) => {
        if (constructorDependency === SourceMainWrapperTransformer) {
            return 'source-outer-transformer';
        }
    },
    props: { sources: { length: 2 } }
};

it('should return array containing SourceMainWrapperTransformer instances', () => {
    fillSourcesOutersTransformersCollection(fsLightbox);

    expect(fsLightbox.collections.sourceMainWrappersTransformers).toEqual(
        ['source-outer-transformer', 'source-outer-transformer']
    );
});
