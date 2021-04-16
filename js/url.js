/**
 * Patches the base URL based on heuristics that try to
 * make it compatible with the expected base URL format.
 *
 * A series of heuristics are used in this patch operation
 * to make it as "standard" as possible.
 *
 * @param {String} url The URL to be patched with a series
 * of pre-defined heuristics.
 * @returns {String} The patched URL with a series of values
 * replaced with proper value.
 */
export const patchBaseUrl = url => {
    const hasProtocol = url.startsWith("http://") || url.startsWith("https://");
    if (hasProtocol) return url;
    const isVercel = url.endsWith(".vercel.app");
    if (!isVercel) return url;
    return `https://${url}`;
};

export default patchBaseUrl;
