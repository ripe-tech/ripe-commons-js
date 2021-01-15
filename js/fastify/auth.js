export const verifyKeyFastify = (key, { headerKey = "X-Secret-Key" } = {}) => (req, res, next) => {
    if (!key) {
        return next();
    }
    const _key = req.query.key || req.headers[headerKey] || null;
    if (key === _key) {
        return next();
    }
    return next(new Error("Invalid key"));
};
