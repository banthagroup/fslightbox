import { SourceOuterTransformer } from "../transforms/SourceOuterTransformer";

export function fillSourcesOutersTransformersCollection(
    {
        collections: { sourcesOutersTransformers },
        props: { sources },
        resolve
    }
) {
    for (let i = 0; i < sources.length; i++) {
        sourcesOutersTransformers[i] = resolve(SourceOuterTransformer, [i]);
    }
}
