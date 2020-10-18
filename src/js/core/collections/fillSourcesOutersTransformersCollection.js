import { SourceOuterTransformer } from "../transforms/SourceOuterTransformer";

export function fillSourcesOutersTransformersCollection(
    {
        collections: { sourceMainWrappersTransformers },
        props: { sources },
        resolve
    }
) {
    for (let i = 0; i < sources.length; i++) {
        sourceMainWrappersTransformers[i] = resolve(SourceOuterTransformer, [i]);
    }
}
