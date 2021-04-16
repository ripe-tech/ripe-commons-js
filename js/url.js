export const patchUrl = url => {
    const hasProtocol = url.startsWith("http://") || url.startsWith("https://");
    const isLocalAdress = url.includes("localhost:");
    if (hasProtocol) return url;
    if (isLocalAdress) return `http://${url}`;
    return `https://${url}`;
};

export default patchUrl;
