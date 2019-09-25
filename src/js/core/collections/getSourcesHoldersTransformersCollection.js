import { SourceOuterTransformer } from "../transforms/SourceOuterTransformer";

export function getSourcesHoldersTransformersCollection({ elements: { sourcesOuters }, resolve }) {
    const collection = [];
    for (let i = 0; i < sourcesOuters.length; i++) {
        const sourceHolderTransformer = resolve(SourceOuterTransformer);
        sourceHolderTransformer.setSourceHolder(sourcesOuters[i]);
        collection.push(sourceHolderTransformer);
    }
    return collection;
}
