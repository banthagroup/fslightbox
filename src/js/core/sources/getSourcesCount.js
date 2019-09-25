export function getSourcesCount({ props: { sources, customSources } }) {
    return (customSources) ?
        (sources) ? Math.max(customSources.length, sources.length) : customSources.length :
        sources.length
}
