export function getAutomaticTypeDetectorBucket() {
    return {
        isUrlYoutubeOne: (url) => {
            const parser = document.createElement('a');
            parser.href = url;
            return parser.hostname === 'www.youtube.com';
        },

        getTypeFromResponseContentType: (responseContentType) => {
            return responseContentType.slice(0, responseContentType.indexOf('/'));
        }
    };
}
